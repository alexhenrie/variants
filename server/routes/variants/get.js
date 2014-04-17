var db = require('../../models')
var handleQuery = require('../../handlers/query')
var handleMeta = require('../../handlers/meta')
var Sequelize = require('sequelize')

module.exports = function(req, res) {
  var dbQuery = handleQuery(req.query)

  if(req.query.start || req.query.end) {
    dbQuery.where = Sequelize.and(
      {"INDIVIDUAL_ID": req.query.INDIVIDUAL_ID || 1},
      Sequelize.or(
        {
          "Start": { "between": [req.query.start || 0,req.query.end || 0] },
          "End": { "between": [req.query.start || 0,req.query.end || 0] }
        }
      )
    )
  }

  dbQuery.order = 'Start ASC'

  dbQuery.limit = 1000

  console.log(dbQuery)

  dbQuery.include = [db.CosmicVariant,db.ThousandGenomeVariant]

  db.Variant.findAndCountAll(dbQuery).success(function(result) {
    return res.json({
      variants: result.rows,
      meta: handleMeta(dbQuery,result)
    })
  })
}
