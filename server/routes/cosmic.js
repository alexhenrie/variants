module.exports = function (req, res) {
  var individualId = parseInt(req.query.individual || 0);
  req.models.cosmic.findByIndividualId(individualId,function(error, data) {
    res.json({
      deleterious: data
    });
  });
};
