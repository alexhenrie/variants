var express = require('express');
var orm = require('orm');
var app = express();

app.use(orm.express("mysql://root@localhost/variants", {
  define: function (db, models, next) {
    models.individual = db.define("individual", {});
    models.variant = db.define("variant", {
      Score: Number,
      Strand: String,
      dbxref: String,
      ReferenceSequence: String,
      TotalReads: Number,
      Alias: String,
      Zygosity: String,
      VariantSequence: String,
      VariantReads: String,
      INDIVIDUAL_ID: Number
    });
    next();
  }
}));

const PORT = 8080;
app.listen(PORT);
console.log('Listening on port ' + PORT);

app.get("/individuals", function (req, res) {
  req.models.individual.find(function (error, individuals) {
    res.json({
      individuals: individuals
    });
  });
});

app.get("/variants", function (req, res) {
  // req.params.individual
  var query = {};
  limit = parseInt(req.query.limit) || 100;

  if(req.query.individual) {
    query.INDIVIDUAL_ID = parseInt(req.query.individual);
  }

  console.log(query);

  req.models.variant.find(query,limit,function(error, variants) {
    res.json({
      variants: variants
    });
  });
});
