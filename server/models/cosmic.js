module.exports = function(db) {
  var Cosmic = db.define("cosmic", {
    Version: String,
    GeneName: String,
    HGNC: String,
    AccessionNumber: String,
    PrimarySite: String,
    SiteSubtype: String,
    PrimaryHistology: String,
    HistologySubtype: String,
    MutationId: Number,
    MutationAA: String,
    MutationCDS: String,
    SomaticStatus: String,
    StartLocation: Number,
    EndLocation: Number,
    Strand: String,
    SAMPLE_ID: Number,
    VARIANT_ID: Number
  });

  Cosmic.findByIndividualId = function(individualId,callback) {
    individualId = parseInt(individualId);
    db.driver.execQuery("SELECT * FROM COSMIC INNER JOIN VARIANT\
      ON COSMIC.VARIANT_ID = VARIANT.ID\
      WHERE VARIANT.INDIVIDUAL_ID = " + individualId, callback);
  }

  return Cosmic;
}
