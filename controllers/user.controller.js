const db = require('../db');
const shortid = require('shortid');
var users = db.get('users').value();

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: users
    });
};

module.exports.search = function (req, res) {
    var q = req.query.q;
    var matchedUsers = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchedUsers,
    });
};

module.exports.cookie = function(req, res, next)
{
    res.cookie('user-name', 'Nguyen Tan Huu Danh');
    res.cookie('user-id', '12345');
    res.send('Hello Danh');

}

module.exports.create = function (req, res) {
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.get = function (req, res) {
    var id = req.params.id;

    var user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function (req, res) {
    req.body.id = shortid.generate();
    console.log(res.locals)
    db.get('users').push(req.body).write();
    res.redirect('/users');
};