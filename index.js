const express = require('express');
const bodyParser = require('body-parser');
var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var authMiddleware = require('./middlewares/auth.middelware');
const cookieParser = require('cookie-parser');
const port = 3333;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Danh'
  });
});

app.get('/styles/custom', function(req, res){

});
app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

