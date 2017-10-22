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

    var feed = {feed: "feed", friendsPosts: results, posts: [{
  "id": "zbLHl5QzTFQo",
  "date": "2017-10-13T20:13:23-0400",
  "author": "Génie 5@8",
  "message": "Ahh l'automne. Les feuilles commencent à tomber, les couleurs changent, les bonbons sont pas trop chers au Walmart, le bon temps quoi! Cette semaine, on te réserve même une activité que tu ne voudra pas manquer.",
  "attachment": {
    "type": "image",
    "url": "https://s3.amazonaws.com/shared.ws.mirego.com/competition/images/19225167_1944400129183097_741905922742649424_n.jpg"
  }
}, {
  "id": "LzKdigX3beH6",
  "date": "2017-10-13T17:56:30-0400",
  "author": "Faculté des sciences",
  "message": "Félicitations à toute l'équipe!",
  "attachment": {
    "type": "image",
    "url": "https://s3.amazonaws.com/shared.ws.mirego.com/competition/images/22289952_1468812669863074_1564894273065314200_o.jpg"
  }
}, {
  "id": "90FcLaXYizIw",
  "date": "2017-10-13T17:25:35-0400",
  "author": "Génie 5@8",
  "message": "Félicitations à nos deux gagnants, Thomas Grégoire et Scotch Dupont qui passeront la partie du Vert et Or de samedi prochain dans une loge VIP grâce à Vidéotron et Génie 5à8 🏆🏈🎉",
  "attachment": null
}, {
  "id": "KmD5Zi0gfiYt",
  "date": "2017-10-13T00:16:42-0400",
  "author": "Faculté de génie",
  "message": "Une équipe de chercheurs canadiens travaille sur le premier fauteuil roulant multifonctionnel autonome développé à très faible coût. Le Pr François Michaud et un de ses étudiants au doctorat, Mathieu Labbé, font partie de l'équipe. #rechercheUdeS #selfdrivingwheelchair",
  "attachment": null
}, {
  "id": "2UMSqhZr9qD5",
  "date": "2017-10-12T23:46:13-0400",
  "author": "Génie 5@8",
  "message": "Équipe Juin 2015 en feu! 🔥",
  "attachment": {
    "type": "image",
    "url": "https://s3.amazonaws.com/shared.ws.mirego.com/competition/images/10285280_1615907055365741_2342967662454531701_o.jpg"
  }
}, {
  "id": "9p3y47th9uEr",
  "date": "2017-10-12T20:01:04-0400",
  "author": "Génie 5@8",
  "message": "Cette semaine au 5@8, prenez-vous en photo au photobooth de l'Oktoberfest Sherbrooke et courez la chance de gagner 1 REMPLISSAGE GRATOS DE 1L à l'OKTO 🎉🤸🏼💚💛",
  "attachment": {
    "type": "image",
    "url": "https://s3.amazonaws.com/shared.ws.mirego.com/competition/images/22195343_2000021746954268_777494157718426353_n.jpg"
  }
}]}

    res.json(feed)
})

})

app.post('/users', (req, res) => {
  db.collection('users').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
