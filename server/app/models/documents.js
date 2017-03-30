module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    ownerId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    access: {
      allowNull: false,
      defaultValue: 'public',
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'public, private or role required'
        }
      }
    },
    ownerRoleId: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Documents;
};
