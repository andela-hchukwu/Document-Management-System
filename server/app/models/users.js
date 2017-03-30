import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field can not be empty'
        },
        is: {
          args: /\w+/g,
          msg: 'Input a valid firstname'
        }
      }
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'This field can not be empty'
        },
        is: {
          args: /\w+/g,
          msg: 'Input a valid lastname'
        }
      }
    },
    userName: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already exist'
      },
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Input a valid username'
        }
      }
    },
    email: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'email address already exist'
      },
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Input a valid email address'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 2
    },
    active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    validate: {
      validatePassword() {
        if (this.password.length !== null && (!(/\w+/g.test(this.password))
        || (this.password.length < 8))) {
          throw new Error('Minimum of 8 characters is required');
        }
      }
    },
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.Documents, { foreignKey: 'ownerId' });
        Users.belongsTo(models.Roles, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      generateHash() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
      validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate(user) {
        user.generateHash();
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.generateHash();
        }
      }
    }
  });
  return Users;
};
