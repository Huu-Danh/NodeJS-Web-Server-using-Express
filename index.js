const express = require('express');
const low = require('lowdb');
const shortid = require('shortid');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();
const bodyParser = require('body-parser')  ;
const port = 3333;
 
const adapter = new FileSync('db.json');
db = low(adapter);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = db.get('users').value();

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Danh'
  });
});

app.get('/users', (req, res) => {
  res.render('users/index', {
    users: users
  });
});

app.get('/users/search', function(req, res){
  var q = req.query.q;
  var matchedUsers = users.filter(function(user){
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  
  res.render('users/index',{
    users:matchedUsers,
  });
});

app.get('/users/create', function(req, res){
  res.render('users/create');
});

app.get('/users/:id', function(req, res){
  var id = req.params.id;

  var user = db.get('users').find({id: id}).value();

  res.render('users/view', {
    user: user
  });
});

app.post('/users/create', function(req, res){
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
