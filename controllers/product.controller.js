var db = require('../db');

module.exports.index = function(req, res){
    var page = parseInt(req.query.page) || 1; //n
    var perPage = 6;// x

    var sum = db.get('products').size().value();
    res.locals.total = Math.ceil(sum / 6);
    
    var start = (page -1) * perPage;
    var end = page * perPage;

    res.locals.cur = page;
    res.render('products/index', {
        products: db.get('products').value().slice(start,end)
    });
};