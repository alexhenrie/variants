var db = require('../../../models')

module.exports = function(req, res){
  db.Individual.find({
    where: {id: req.params.id}
  }).success(function(result) {
    return res.json({
      individual: result
    });
  });
}
