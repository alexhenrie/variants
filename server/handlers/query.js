module.exports = function handleQuery(queryParameters, dbQuery) {
  if(typeof dbQuery === 'undefined') {
    dbQuery = {};
  }

  if(queryParameters.limit && parseInt(queryParameters.limit) > 0) {
    dbQuery.limit = parseInt(queryParameters.limit);
  } else {
    dbQuery.limit = 50;
  }

  if(queryParameters.offset) {
    dbQuery.offset = parseInt(queryParameters.offset);
    if(dbQuery.offset < 0) {
      dbQuery.offset = 0;
    }
  } else {
    dbQuery.offset = 0;
  }

  if(queryParameters.order) {
    dbQuery.order = JSON.parse(queryParameters.order);
  }

  if(queryParameters.where) {
    dbQuery.where = JSON.parse(queryParameters.where);
  } else {
    dbQuery.where = {};
  }

  return dbQuery;
};
