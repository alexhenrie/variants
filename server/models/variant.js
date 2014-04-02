module.exports = function(db) {
  var Variant = db.define("variant", {
    Score: Number,
    Strand: String,
    dbxref: String,
    ReferenceSequence: String,
    TotalReads: Number,
    Alias: String,
    Zygosity: String,
    VariantSequence: String,
    VariantReads: String,
    INDIVIDUAL_ID: Number
  });

  return Variant;
}
