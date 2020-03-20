const express = require('express');
const cookieParser = require('cookie-parser');
const {v4: uuidv4} = require('uuid');
const models = require('./models'); ;
const app = express();


app.use(express.static('./public'));
app.use(express.json());
app.use(cookieParser());

// Check login
app.get('/session', (req, res) => {
  const uid = req.cookies.uid;
  if (!uid) {
    res.status(401).json({code: 'provide-error'});
    return;
  }
  if (!models.users[uid]) {
    res.clearCookie('uid');
    res.status(403).json( {code: 'provide-error'});
    return;
  }
  res.sendStatus(200);
});

// Log in
app.post('/session', (req, res) => {
  const username = req.body.username;
  if (req.body.action === 'login') {
    if (username === 'dog') {
      res.status(403).json( {code: 'provide-error'});
      return;
    }
    const uid = uuidv4();
    models.message[username] = models.message[username] || ['Nothing'];
    const message = models.message[username];
    models.users[uid] = {'username': username};
    res.cookie('uid', uid);
    res.json(message);
  } else if (req.body.action === 'logout') {
    res.clearCookie('uid');
    delete models.users[uid];
    res.sendStatus(200);
  }
});

app.get('/users', (req, res) => {
  const uid = req.cookies.uid;
  checkUID(uid, res);
  // todos: get user list
});

// Load message list
app.get('/message', (req, res) => {
  const uid = req.cookies.uid;
  checkUID(uid, res);

  res.json(models.message);
});


app.post('/message', (req, res) => {
  const uid = req.cookies.uid;
  checkUID(uid, res);
  const username = models.users[uid];
  const content = req.body.content;
  models.message.push({content: content, username: username, time: new Date()});
  res.status(200);
  res.json(models.message);
  // add message
});


function checkUID(uid, res) {
  if (!uid || !models.users[uid]) {
    res.clearCookie('uid');
    res.status(401).json( {error: 'login error'});
    return;
  }
}

app.listen(3000, console.log('Running'));
