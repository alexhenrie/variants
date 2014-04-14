var express = require('express')
var http = require('http')
var cors = require('cors')
var db = require('./models')
var glob = require('glob')
var last = require('lodash-node/modern/arrays/last')
var app = express()

app.use(cors())
app.use(express.bodyParser())

const PORT = 3002

var routes = {}

glob.sync("routes/**/*.js").filter(function(file) {
  return file.indexOf('.spec') === -1
}).forEach(function(file) {
  var withoutExtension = file.replace('.js','')
  var verb = last(withoutExtension.split('/'))
  var withoutVerb = withoutExtension.replace('/' + verb,"")
  var withoutRoutesPrefix = withoutVerb.replace('routes','')
  if(typeof routes[withoutRoutesPrefix] === 'undefined') {
    routes[withoutRoutesPrefix] = []
  }
  routes[withoutRoutesPrefix].push(verb)
  app[verb](withoutRoutesPrefix, require('./' + withoutExtension))
})

app.get('/', function(req, res) {
  res.json(routes)
})

app.get("/individuals", require('./routes/individuals/get'))
app.get("/individuals/:id", require('./routes/individuals/:id/get'))
app.get("/individuals/:individual_id/variants", require('./routes/individuals/:id/variants/get'))
app.get("/variants", require('./routes/variants/get'))
app.get("/variants/:id", require('./routes/variants/:id/get'))
// app.get("/individuals/:individual_id/variants/deleterious", require('./routes/individuals/:id/variants/deleterious/get'))

db.sequelize
  .authenticate()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(PORT, function(){
        console.log('Express server listening on port ' + PORT)
      })
    }
  })
