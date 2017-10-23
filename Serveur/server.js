const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

var db

MongoClient.connect('mongodb://sherbrooke:allo@ds163417.mlab.com:63417/sherbrooke_app', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/find/infos', (req, res) => {

  var ResUsers
  var ResPosts
  db.collection('users').find().toArray(function(err, results) {
    if (err) return console.log(err);
    ResUsers = results
  })

  db.collection('post').find().toArray(function(err, results) {
    if (err) return console.log(err);
    ResPosts = results
  })

  var feed = {feed: "feed", friendsPosts: ResUsers, posts: ResPosts}
  res.json(feed)
})

app.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved friend to database')
    res.redirect('/')
  })
})

app.post('/post', (req, res) => {
  db.collection('post').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved post to database')
    res.redirect('/')
  })
})

