const Session = require('../models/session');

const redirectLogin = (req, res, next) => {
    req.session.useremail ? next() : res.redirect('login')
};              

const redirectHome = (req, res, next) => {
    req.session.useremail ? res.redirect('index') : next()
};

const playerTotals = (result) => {
    let total = 0;
                let totalBuyin = 0;
                let totalCashout = 0;
                result.forEach(sess => {
                    total += sess.session_balance,
                    totalBuyin += sess.buyin,
                    totalCashout += sess.cashout
                 });
                let totals = {
                 sessions: result.length,
                 total: total,
                 totalBuyin: totalBuyin,
                 totalCashout: totalCashout,
                 avgBuyin: totalBuyin / result.length,
                 avgCashout: totalCashout / result.length,
                 avgProfit: total / result.length
                 };
                return totals;
};

function getPlayerTotals(str){ 
    return Session.find({player: str})
                  .exec()
                  .then(playerTotals)
                  .catch(err => console.log(err));
                };
                
module.exports = {redirectLogin, redirectHome, playerTotals, getPlayerTotals};