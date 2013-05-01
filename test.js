/**
 *
 * Call Express
 */
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("connected to mongo");
});


var kittySchema = mongoose.Schema({
    name: String
}, { collection: 'sdfasfasfasf' });




 // NOTE: methods must be added to the schema before compiling it with mongoose.model()
 kittySchema.methods.speak = function () {
 var greeting = this.name
 ? "Meow name is " + this.name
 : "I don't have a name"
 console.log(greeting);
 };

var Kitten = mongoose.model('asd', kittySchema);

 var fluffy = new Kitten({ name: 'fluffy' });
 fluffy.speak(); // "Meow name is fluffy"


 fluffy.save(function (err, fluffy) {
 if (err) // TODO handle the error
 fluffy.speak();
 });
/*

 Kitten.find(function (err, kittens) {
 if (err) // TODO handle err
 console.log(kittens)
 });

 Kitten.find({ name: /^Fluff/ }, callback);


console.log(silence.name); // 'Silence'
*/