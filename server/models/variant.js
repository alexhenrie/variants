module.exports = function(sequelize, DataTypes) {
  const attributes = {
    "ID": {
      "type": "BIGINT(20)",
      "allowNull": false,
      "defaultValue": null,
      "primaryKey": true
    },
    "FileID": {
      "type": "VARCHAR(50)",
      "allowNull": false,
      "defaultValue": null
    },
    "Source": {
      "type": "VARCHAR(50)",
      "allowNull": false,
      "defaultValue": null
    },
    "Type": {
      "type": "VARCHAR(50)",
      "allowNull": false,
      "defaultValue": null
    },
    "Start": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null
    },
    "End": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null
    },
    "Score": {
      "type": "FLOAT",
      "allowNull": false,
      "defaultValue": null
    },
    "Strand": {
      "type": "VARCHAR(50)",
      "allowNull": false,
      "defaultValue": null
    },
    "dbxref": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "ReferenceSequence": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "TotalReads": {
      "type": "INT(11)",
      "allowNull": true,
      "defaultValue": null
    },
    "Alias": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "Zygosity": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "VariantSequence": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "VariantReads": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "INDIVIDUAL_ID": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null
    }
  }

  var Variant = sequelize.define('Variant', attributes, {
    timestamps: false,
    underscored: true,
    tableName: 'VARIANT',
    classMethods: {
      // findByIndividualAndNucleotideRange: function(individual_id,start,end) {
      //   return sequelize.query('SELECT * FROM cosmic_variants INNER JOIN variants\
      //     ON cosmic_variants.VARIANT_ID = variants.ID\
      //     WHERE variants.INDIVIDUAL_ID = :individual_id ;',null,{
      //       raw:true
      //   }, {
      //     individual_id: individual_id
      //   })
      // },
      associate: function(models) {
        Variant.belongsTo(models.Individual, {
          foreignKey: 'INDIVIDUAL_ID'
        })

        Variant.hasOne(models.CosmicVariant, {
          foreignKey: 'VARIANT_ID'
        })

        Variant.hasOne(models.ThousandGenomesVariant, {
          foreignKey: 'VARIANT_ID'
        })
      }
    }
  })

  return Variant
}
