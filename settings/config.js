var MongoClient = require('mongodb').MongoClient;
var {dburl,dbcollection} = require('./settings.json')
var url = dburl+dbcollection;

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("bicicletas", function(err, res) {
      if (err) throw err;
      console.log("Collection created");
      db.close();
    });
});