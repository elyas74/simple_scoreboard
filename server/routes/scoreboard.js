
var db = require('mongo_schemas');
module.exports = (function () {
    var _return = {};

    _return.get = function (req, res) {
        db.users.find({ _verify : true },{ contests : true , meetings : true , _id : false , codeforces_username : true , last_name : true }).lean().exec(function(err,r){
            if(err) console.log(err);
            else if(r){
                for(var i in r){
                    var score = 0 ,questions = 0;

                    if(r[i].meetings){
                        score += (r[i].meetings.length)*4 ;
                        r[i].meetings = r[i].meetings.length ;
                    }
                        
                    if(r[i].contests){                        
                        r[i].contests.forEach(function(contest){
                            score += contest.be_score ;
                            var max_score = 0 ;
                            var temp_score = 0 ;

                            contest.solved_q_summary.forEach(function(q){ 
                                max_score += String.score(q.n,0,0);
                            });

                            contest.questions.forEach(function(q){ 
                                temp_score += (String.score(q.all_accepts,q.time,q.wrongs));
                            });
                            if(contest.questions) questions += contest.questions.length ;

                            score += (temp_score/max_score)*contest.max_question_score ;
                        });
                        r[i].contests = r[i].contests.length ;    
                    }
                    
                    r[i].score = Math.round( score * 1000 ) / 1000  ;
                    r[i].questions = questions ;
                }
            }

            res.render("scoreboard",{ data : r });
        });

    };

    _return.post = function (req, res ,next) {
        next();
    };

    return _return;
})();
