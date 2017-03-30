module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      allowNull: true,
      unique: {
        args: true,
        msg: 'role already exist'
      },
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Input a valide title'
        },
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      },
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Roles.hasMany(models.Users, { foreignKey: 'rolesId' });
      }
    }
  });
  return Roles;
};
