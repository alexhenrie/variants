var db = require('../../models')
var handleQuery = require('../../handlers/query');
var handleMeta = require('../../handlers/meta');

module.exports = function(req, res){
  var dbQuery = handleQuery(req.query);

  dbQuery.include = [db.CosmicVariant,db.ThousandGenomeVariant];

  db.Variant.findAndCountAll(dbQuery).success(function(result) {
    return res.json({
      variants: result.rows,
      meta: handleMeta(dbQuery,result)
    });
  });
}
