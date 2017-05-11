module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    OwnerId: {
      type: DataTypes.INTEGER
    },
    access: {
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    OwnerRoleId: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          // as: 'Owner',
          foreignKey: 'OwnerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Document;
};
