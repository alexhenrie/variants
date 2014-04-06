var express = require('express');
var http = require('http');
var cors = require('cors');
var db = require('./models');
var app = express();

app.use(cors());
app.use(express.bodyParser());

const PORT = 3002;

app.get("/", function(req, res) {
  res.json([
    'individuals',
    'variants'
  ]);
});

app.get("/individuals", require('./routes/individuals/get'));
app.get("/individuals/:id", require('./routes/individuals/:id/get'));
app.get("/individuals/:individual_id/variants", require('./routes/individuals/:id/variants/get'));
app.get("/variants", require('./routes/variants/get'));
app.get("/variants/:id", require('./routes/variants/:id/get'));
// app.get("/individuals/:individual_id/variants/deleterious", require('./routes/individuals/:id/variants/deleterious/get'));

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
