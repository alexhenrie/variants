module.exports = function handleMeta(dbQuery,result) {
  return {
    count: result.count,
    limit: dbQuery.limit,
    offset: dbQuery.offset,
    order: dbQuery.order
  };
}
