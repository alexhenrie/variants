var express = require('express');
var orm = require('orm');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(orm.express("mysql://root@localhost/variants", {
  define: function (db, models, next) {
    models.individual = db.define("individual", {});


    models.cosmic = require('./models/cosmic')(db);


    models.variant = require('./models/variant')(db);
    next();
  }
}));

const PORT = 8080;
app.listen(PORT);
console.log('Listening on port ' + PORT);

app.get("/individuals", require('./routes/individuals'));
app.get("/variants", require('./routes/variants'));
app.get("/deleterious", require('./routes/cosmic'));
