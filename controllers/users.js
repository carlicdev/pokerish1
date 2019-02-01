const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    console.log(req.body);
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail already exists!'
                });
            } else {
                bcrypt.hash( req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                         const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            name: req.body.name,
                            password: hash
                    });
                        user.save()
                            .then(result => {
                                res.status(201).render('welcome');
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).render('signup');
                            });
                        }
                    });
                }
            })
            .catch(err=> {
                res.status(500).render('signup');
            })

};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) return res.render('login');
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) return res.render('login');
                if ( result ) {
                    req.session.useremail = req.body.email;
                    res.render('logged', {useremail: req.session.useremail});
                }
            });
        })
        .catch(err => res.render('login'));
};

exports.user_logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return res.redirect('index');
        } else {
            console.log('cleared cookie');
            res.clearCookie('sid');
            res.redirect('login');
        }
    });
}