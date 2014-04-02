module.exports = function (req, res) {
  req.models.individual.find(function (error, individuals) {
    res.json({
      individuals: individuals
    });
  });
};
