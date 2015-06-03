
var db = require('mongo_schemas');
var request = require('request');

module.exports = (function () {
    var _return = {};

    _return.get = function (req, res) {
        console.log("get /scoreboead");
        db.users.find({ _verify : true },{ codeforces_username : true , _id : false }).lean().exec(function(err,r){
            res.render('sign_up',{ data : r });
        });
    };

    _return.post = function (req, res) {
        var user = req.body ;

        // console.open(user);

        // uncomment this comment to add recapcha ti site from server side and for client uncomment codes in /client/view/index.ejs
       var options = {
           url: 'https://www.google.com/recaptcha/api/siteverify',
           method: 'POST' ,
           form : {
               secret : "6Le1VgYTAAAAADx5XO24EmHG4ac1NE5JbWxJue0Z" ,
               response : user['g-recaptcha-response']
           }
       };

       request(options, function (error, response, body) {
           var body = JSON.parse(body);
           if (!error && response.statusCode == 200 && body){
            //    console.open(body);
               if(body["success"] == true){
                   if(user.first_name && user.last_name && user.mobile && user.codeforces_username && user.email){
                       db.users.findOne({ codeforces_username : user.codeforces_username }).lean().exec(function(err,u){
                           if(err) res.json({ sign_up : false });
                           else if(u) res.json({ sign_up : false  , exists : true});
                           else {
                               user.meetings = 0 ;
                               user.contests = 0 ;
                               user.questions = 0 ;
                               user.score = 0 ;
                               new db.users(user).save(function(err,d){
                                   if(err) res.json({ sign_up : false });
                                   else {
                                       res.json({ sign_up : true , exists : false});
                                       console.log("new users add -> " + d.codeforces_username);
                                   }
                               });
                           }
                       });
                   } else {
                       res.json({ sign_up : false });
                   }
               } else {
                   console.log("recapcha not success ");
                   res.json({ auth : false });
               }
           } else {
               console.log("error with request of GOOGLE!");
               res.json({ auth : false });
           }
       });
}

    return _return;
})();
