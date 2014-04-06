module.exports = function(sequelize, DataTypes) {
  const attributes = {
    "ID": {
      "type": "BIGINT(20)",
      "allowNull": false,
      "defaultValue": null,
      "primaryKey": true
    },
    "Version": {
      "type": "VARCHAR(10)",
      "allowNull": false,
      "defaultValue": null
    },
    "GeneName": {
      "type": "VARCHAR(45)",
      "allowNull": true,
      "defaultValue": null
    },
    "HGNC": {
      "type": "INT(11)",
      "allowNull": true,
      "defaultValue": null
    },
    "AccessionNumber": {
      "type": "VARCHAR(45)",
      "allowNull": true,
      "defaultValue": null
    },
    "PrimarySite": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "SiteSubtype": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "PrimaryHistology": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "HistologySubtype": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "MutationId": {
      "type": "INT(11)",
      "allowNull": true,
      "defaultValue": null
    },
    "MutationAA": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "MutationCDS": {
      "type": "VARCHAR(45)",
      "allowNull": true,
      "defaultValue": null
    },
    "SomaticStatus": {
      "type": "VARCHAR(45)",
      "allowNull": true,
      "defaultValue": null
    },
    "StartLocation": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null
    },
    "EndLocation": {
      "type": "INT(11)",
      "allowNull": true,
      "defaultValue": null
    },
    "Strand": {
      "type": "VARCHAR(45)",
      "allowNull": true,
      "defaultValue": null
    },
    "SAMPLE_ID": {
      "type": "INT(11)",
      "allowNull": true,
      "defaultValue": null
    },
    "VARIANT_ID": {
      "type": "BIGINT(20)",
      "allowNull": false,
      "defaultValue": null
    }
  };

  var CosmicVariant = sequelize.define('CosmicVariant', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'cosmic_variants',
    classMethods: {
      associate: function(models) {
        CosmicVariant.belongsTo(models.Variant, {
          foreignKey: 'VARIANT_ID'
        });
      },
      findByIndividualId: function(individual_id) {
        individualId = parseInt(individualId);
        return sequelize.query.execQuery("SELECT * FROM COSMIC INNER JOIN VARIANT\
          ON COSMIC.VARIANT_ID = VARIANT.ID\
          WHERE VARIANT.INDIVIDUAL_ID = :individual_id", null, {
            raw: true
          }, {
            individual_id: individual_id
          });
      }
    }
  })

  return CosmicVariant
};
