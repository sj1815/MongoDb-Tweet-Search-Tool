var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/page1', function(req, res, next) {
    var db_name = 'users';
    var collection_name = 'Oscar';

    var text = req.query.text;

    if (text == null)
    {
      text = '';
    }


    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var array = db.collection(collection_name).find({Text: { $regex: ".*" + text + "*." }}).limit(20).toArray();
            db.close();
            resolve(array);
            //--------------------------------------
        }).then(function (arr) {
            //--------------------------------------
            console.log(arr);

            if (text == null) {
                res.render('page1', { list: [] } );

            } else {
                res.render('page1', { list: arr } );
            }

            //--------------------------------------
        });
    });
});

/* GET home page. */
router.get('/oscarHtm', function(req, res, next) {

    var db_name = 'users';
    var collection_name = 'Oscar';
  var id = req.query.id;

    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var array = db.collection(collection_name).find({_id: new ObjectId(id)}).limit(1).toArray();
            db.close();
            resolve(array);
            //--------------------------------------
        }).then(function (arr) {
            //--------------------------------------
            console.log(arr);


            res.render('oscarHtm', { doc: arr[0] } );


            //--------------------------------------
        });
    });
});


/* GET home page. */
router.get('/oscarUpdate', function(req, res, next) {

  var ctext = req.query.ctext;
  var id = req.query.id;

    var db_name = 'users';
    var collection_name = 'Oscar';
    var id = req.query.id;

    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var rs = db.collection(collection_name).update({_id: new ObjectId(id)},{ $push : {comments: ctext} });
            console.log("Collection Updated");

            //
            // db.close();
             resolve(1);
            //--------------------------------------
        }).then(function ($x) {
            //--------------------------------------
            //console.log(arr);
            res.redirect('http://localhost:3000/oscarHtm?id=' + id);



            //--------------------------------------
        });
    });
});


/* GET home page. */
router.get('/page2', function(req, res, next) {
    var db_name = 'users';
    var collection_name = 'tweets';

    var text = req.query.text;

    if (text == null)
    {
        text = '';
    }


    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var array = db.collection(collection_name).find({text: { $regex: ".*" + text + "*." }}).limit(20).toArray();
            db.close();
            resolve(array);
            //--------------------------------------
        }).then(function (arr) {
            //--------------------------------------
            console.log(arr);

            if (text == null) {
                res.render('page2', { list: [] } );

            } else {
                res.render('page2', { list: arr } );
            }

            //--------------------------------------
        });
    });
});

/* GET home page. */
router.get('/tweetsHtm', function(req, res, next) {

    var db_name = 'users';
    var collection_name = 'tweets';
    var id = req.query.id;

    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var array = db.collection(collection_name).find({_id: new ObjectId(id)}).limit(1).toArray();
            db.close();
            resolve(array);
            //--------------------------------------
        }).then(function (arr) {
            //--------------------------------------
            console.log(arr);


            res.render('tweetsHtm', { doc: arr[0] } );


            //--------------------------------------
        });
    });
});


/* GET home page. */
router.get('/tweetsUpdate', function(req, res, next) {

    var ctext = req.query.ctext;
    var id = req.query.id;

    var db_name = 'users';
    var collection_name = 'tweets';
    var id = req.query.id;

    //Connecting using MongoClient
    MongoClient.connect('mongodb://localhost:27017/' + db_name, function (err, db) {
        return new Promise(function (resolve, reject) {
            if (err) reject(err);
            //--------------------------------------
            var rs = db.collection(collection_name).update({_id: new ObjectId(id)},{ $push : {comments: ctext} });
			console.log("Collection Updated");

            //
            // db.close();
            resolve(1);
            //--------------------------------------
        }).then(function ($x) {
            //--------------------------------------
            //console.log(arr);
            res.redirect('http://localhost:3000/tweetsHtm?id=' + id);



            //--------------------------------------
        });
    });
});





module.exports = router;
