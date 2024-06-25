const express = require('express');
const app = express();
const port = 3333;

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
  {id: 1, name: 'Danh'},
  {id: 2, name: 'Tai'}
];

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
