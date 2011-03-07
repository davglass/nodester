
var config = require('../config'),
    cradle = require('cradle'),
    lib = require('./lib');

console.log(config);

module.exports = {
    index: function(req, res, next) {
        res.render('index');
    },
    login: function(req, res) {
        res.redirect('/login.html');
    },
    auth: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var db = lib.get_couchdb_database('nodefu');
        console.log(req.body);
        db.get(username, function (err, doc) {
            if (err) {
                console.log(err);
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end('{"status" : "failure", "message": "Invalid username or password."}\n');
              return;
            }
            console.log(err, doc);
            if (doc._id == username && doc.password == lib.md5(password)) {
                req.send('AUTHED');
            } else {
              res.writeHead(401, { 'Content-Type': 'application/json' });
              res.end('{"status" : "failure", "message": "Invalid username or password. 2"}\n');
            }
        });

    }
}
