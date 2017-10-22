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

app.get('/find/users', (req, res) => {

  db.collection('users').find().toArray(function(err, results) {
    if (err) return console.log(err);

    res.json(results)
})

})

app.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
