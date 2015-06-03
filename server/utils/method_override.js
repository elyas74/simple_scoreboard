
var db = require('mongo_schemas');

// this file add some functions to node librarys ;)

var fs = require('fs');
var convert_date = require('date');


Date.en_to_persion_date = function en_to_persion_date(d,callback){
    var date = new Date(d);
    var _return = {} ;
    var min = date.getMinutes() , hour = date.getHours() ,second = date.getSeconds() ;
    if( min < 60 - global.init.time_diffrence )
        min = Number(min) + global.init.time_diffrence ;
    if(min < 10) min = '0' + String(min);
    if(hour < 10) hour = '0' + String(hour);
    if(second < 10) second = '0' + String(second);
    convert_date.to_shamsi({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
    }, function (jalali) {
        _return.date = jalali.year + "/" + jalali.month + "/" + jalali.day ;
        _return.time = hour + ":" + min + ":" + second;
        _return.second_less_time = hour + ":" + min ;
        if(callback) callback(_return);
    });
}


//-------------------------------------------------------------------
// log income string with date is so better

console.temp = console.log;
console.log = function (string) {

    Date.en_to_persion_date(new Date(),function(date){
        var s = "" ;
        s += date.date.substring(5) + " " + date.time + " -> " ;
        console.temp(s.green + string );
        file_log(s + string + "\n");
        if(global.init.mongo_log){
            mongo_log(s + string);
        }
    });
};

console.open = function (string) {
    var d = new Date();

    var month = d.getMonth() + 1;

    var s = month + "/";
    s += d.getDate() + " ";
    s += d.getHours() + ":";
    s += (d.getMinutes() > 9) ? d.getMinutes() : "0" + d.getMinutes();
    s += ":";
    s += (d.getSeconds() > 9) ? d.getSeconds() : "0" + d.getSeconds();

    console.temp(s.green + " -> ".green + JSON.stringify(string, null, "    "));
    file_log(s + " -> " + " " + string+ "\n")

};

function file_log (log) {
    fs.appendFile("server/logs" , log  , function (err) {
        if (err) return console.temp(err);
    });
}

function mongo_log(log){
    var s = require('../../package.json') ;
    new db.logs({
        log : log
    }).save(function(err){
            if(err) console.temp(err);
        });
}

