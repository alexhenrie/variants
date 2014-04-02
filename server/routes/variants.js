module.exports = function (req, res) {
  // req.params.individual
  var query = {};
  limit = parseInt(req.query.limit) || 100;

  if(req.query.individual) {
    query.INDIVIDUAL_ID = parseInt(req.query.individual);
  }

  req.models.variant.find(query,limit,function(error, variants) {
    res.json({
      variants: variants
    });
  });
};
