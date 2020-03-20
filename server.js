const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const models = require('./models');
const app = express();


app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

// Check login
app.get('/session', (req, res) => {
    let uid = req.cookie.uid; 
    if(!uid) {
        res.status(401).json({code: 'provide-error'});
        return ;
    }
    if(!models.users[uid]) {
        req.clearCookie('uid');
        res.status(403).json( {code: 'provide-error'});
        return ;
    }
    res.sendStatus(200);
});

//Log in
app.post('/session', (req, res) => {
    const username = req.body.username;
    if(username === 'dog') {
        res.status(403).json( {code: 'provide-error'});
        return ;
    }
    const uid = uuidv4();
    models.message[username] = models.message[username] || ['Delete me'];
    const message = models.message[username];
    models.users[uid] = { "username":username, "message":message};
    res.cookie('uid',uid);
    res.json(message);
});

app.get('/users', (req, res) => {
    const uid = req.cookies.uid;

    // todos: get user list 
});

// Load message list 
app.get('/message', (req, res) => {
    const uid = req.cookies.uid;
    checkUID(uid,res);

    res.json(Object.values(models.message));
});


app.post('/message', (req, res) => {
    const uid = req.cookies.uid;
    checkUID(uid, res);

    // add message
}) 


function checkUID(uid, res) {
    if(!uid || !models.users[uid]) {
        res.clearCookie('uid');
        res.status(401).json( {error: 'login error'});
        return ;
    }
}

app.listen(3000, console.log("Running"));