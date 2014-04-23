module.exports = function(sequelize, DataTypes) {
  const attributes = {
    "ID": {
      "type": "INT(11)",
      "allowNull": false,
      "defaultValue": null,
      "primaryKey": true
    },
    "dbxref": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "Gender": {
      "type": "VARCHAR(7)",
      "allowNull": true,
      "defaultValue": null
    },
    "Population": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "Comment": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    },
    "GenomeAnnotation": {
      "type": "VARCHAR(50)",
      "allowNull": true,
      "defaultValue": null
    }
  };

  var Individual = sequelize.define('Individual', attributes, {
    timestamps: false,
    tableName: 'INDIVIDUAL',
    classMethods: {
      associate: function(models) {
        Individual.hasMany(models.Variant, {
          foreignKey: 'INDIVIDUAL_ID'
        });
      }
    }
  })

  return Individual
};
