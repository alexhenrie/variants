module.exports = function(sequelize, DataTypes) {
  const attributes = {
    "ID": {
      "type": "BIGINT(20)",
      "allowNull": false,
      "defaultValue": null,
      "primaryKey": true
    },
    "GenomeLocation": {
      "type": "VARCHAR(50)",
      "allowNull": false,
      "defaultValue": null
    },
    "Dbsnpid": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "ReferenceAllele": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "ReferenceStat": {
      "type": "FLOAT",
      "allowNull": true,
      "defaultValue": null
    },
    "VariantAllele": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "VariantFrequency": {
      "type": "FLOAT",
      "allowNull": true,
      "defaultValue": null
    },
    "Individual_Id": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null
    },
    "VARIANT_ID": {
      "type": "BIGINT(20)",
      "allowNull": false,
      "defaultValue": null
    }
  };
  var ThousandGenomeVariant = sequelize.define('ThousandGenomeVariant', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'thousand_genome_variants',
    classMethods: {
      associate: function(models) {
        ThousandGenomeVariant.belongsTo(models.Variant, {
          foreignKey: 'VARIANT_ID'
        });
      }
    }
  })

  return ThousandGenomeVariant
};
