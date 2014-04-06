var db = require('../../../models')

module.exports = function(req, res){
  db.Variant.find({
    where: {id: req.params.id},
    include: [db.Individual,db.CosmicVariant,db.ThousandGenomeVariant]
  }).success(function(result) {
    return res.json({
      variant: result
    });
  });
}
