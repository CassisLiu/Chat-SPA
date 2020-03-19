const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


 let items = {
   1: {
        id: 1,
        name: "apple",
        amount: 3,
    },
    2: {
        id: 2,
        name: "peach",
        amount: 2,
    },
    3: {
        id: 3,
        name:"water",
        amount:3,
    }, 
};

let users = {};

app.post('/session/', (req, res) => {
    const name = req.body.name;
    const log = req.body.type;
    if(!name ||name.includes(' ' ) || name.includes('dog')) {
        res.status(400).json({ error: "Illegal-name"});
    } else if(log === "login") {
        let uid = req.cookies.uid;
        if(!uid || !users[uid]) {
            uid = name+'123';
        }
        users[name] = uid;
        res.json(Object.values(items)); 
    } 
});


app.get('/item/', (req, res) => {
    console.log(Object.values(items));
    res.json(Object.values(items));
});

app.get('/item/:id', (req, res) => {
    const id = req.params.id;
    console.log(items[id]);
    if(items[id]) {
        res.json(items[id]);
    } else {
        res.status(404).json( {error: `Item not found: ${name}`});
    }
});

app.post(`/item/:name`,  (req, res) => {
    const id =  Object.keys(items).length + 1;
    const name = req.params.name;
    const duplicate = Object.values(items).find(i => i.name === name);
    if(duplicate) {
        res.status('400').json( {error: 'duplicate'});
    }
    while(items[id]) {
        id++;
    }
    items[id] = { "id": id, "name": req.body.name, "amount": req.body.amount}
    console.log(req.body);
    res.json(Object.values(items));

});

app.delete('/item/:id', (req, res) => {
    const id = req.params.id ;
    console.log(id);
    console.log("you are in the delete block");
    if(!id) {
        res.status(400).json( {error: 'missing-id'});
        return ;
    }
    if(items[id]) {
        delete items[id];
        res.json(Object.values(items));
    } else {
        res.status(404).json( {error: 'Item not found'}); 
    }
});

app.put('/item/:id', (req, res) => {
    console.log("coming....");
    const id = req.params.id;
    const amount = req.body.amount;
    items[id].amount = amount;
    console.log("New amount:" + amount+ ", updated value:" + items[id].amount);
    res.json(Object.values(items));
})

app.listen(3000, console.log('Server is running'));