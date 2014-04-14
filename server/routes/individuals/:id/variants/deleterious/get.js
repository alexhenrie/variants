var db = require('../../../../../models');
var handleQuery = require('../../../../../handlers/query');
var handleMeta = require('../../../../../handlers/meta');

module.exports = function(req, res) {
  var dbQuery = handleQuery(req.query)

  db.CosmicVariant.findByIndividualId(req.params.id).success(function(result) {
    return res.json({
      deleterious: result,
      meta: handleMeta(dbQuery,result)
    });
  });
}
