const mongoose = require('mongoose');
const Session = require('../models/session');
const utils = require('../utils/utils');

exports.sessions_get_all = (req, res, next) => {
    Session.find()
           .exec()
           .then(result => {
               res.status(200).render('allsessions', {result: result});
           })
           .catch(err => {
               console.log(err);
               res.status(500).json(err);
           });
};

exports.sessions_get_all_graph = (req, res, next) => {
    Session.find({player: 'Carlic'})
           .exec()
           .then(result => {
               let z = 0;
               let graphLabels = [];
               const dataToGraph = result.map(sess => ({
                   x:result.indexOf(sess) +1,
                   y: z += sess.session_balance
               }));
              result.forEach(sess => {
                   graphLabels.push(JSON.stringify(result.indexOf(sess) + 1));
               });
               res.render('graph', {dataToGraph,graphLabels});
           })
           .catch(err => {
               console.log(err);
               res.status(500).json(err);
           });
};

exports.sessions_newsession = (req, res, next) => {
    const session = new Session({
        _id: new mongoose.Types.ObjectId(),
        player: req.body.player,
        gametype: req.body.gametype,
        tablesize: req.body.tablesize,
        location: req.body.location,
        game: req.body.game,
        buyin: req.body.buyin,
        cashout: req.body.cashout,
        session_balance: (req.body.cashout - req.body.buyin),
        date: req.body.date
    });
    session.save()
           .then(result => {
               res.status(201).render('index');
           })
           .catch(err => {
               console.log(err);
               res.status(404).render('404');
           });
};

exports.sessions_get_totals = (req, res, next) => {
    Session.find()
           .exec()
           .then(result => {
               let total = 0;
               let totalBuyin = 0;
               let totalCashout = 0;
               result.forEach(sess => {
                   total += sess.session_balance,
                   totalBuyin += sess.buyin,
                   totalCashout += sess.cashout
                });
               let totals = {
                total: total,
                totalBuyin: totalBuyin,
                totalCashout: totalCashout,
                avgBuyin: totalBuyin / result.length,
                avgCashout: totalCashout / result.length,
                avgProfit: total / result.length
                };
                let z = 0;
                let graphLabels = [];
                const dataToGraph = result.map(sess => ({
                    x:result.indexOf(sess) +1,
                    y: z += sess.session_balance
                }));
               result.forEach(sess => {
                    graphLabels.push(JSON.stringify(result.indexOf(sess) + 1));
                });
               res.status(200).render('overview', {totals, dataToGraph, graphLabels});
           })
           .catch(err => {
               console.log(err);
               res.status(500).json(err);
           });
};

let jaacsinTotals = utils.getPlayerTotals('Jaacsin');
let pippenTotals = utils.getPlayerTotals('Pippen'); 
let carlicTotals = utils.getPlayerTotals('Carlic'); 

exports.sessions_byplayer = (req, res, next) => {
    Promise.all([jaacsinTotals, pippenTotals, carlicTotals])
           .then(result => {
              res.status(200).render('byplayer', 
                             {
                                 jaacsinTotals: result[0], 
                                 pippenTotals: result[1], 
                                 carlicTotals: result[2]
                                });
             
           })
           .catch(err => {
               console.log(err);
               res.status(404).render('404');
           });
}