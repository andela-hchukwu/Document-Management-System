/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Role = require('../../app/models').Role;
const roleParams = require('../testHelper').testRole;

describe('Role Model', () => {
  describe('Create Role', () => {
    let role;
    before(() => Role.create(roleParams)
        .then((createdRole) => {
          role = createdRole;
        }));
    after(() => Role.sequelize.sync({ force: true }));

    it('should be able to create a role', () => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
    });

    it('should be able to create a role that has a title', () => {
      expect(role.title).to.equal(roleParams.title);
    });
  });

  describe('Role Model Validations', () => {
    afterEach(() => Role.sequelize.sync({ force: true }));

    describe('Title Field Validation', () => {
      it('requires title field to create a role', () => Role.create()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
          }));

      it('ensures a role can only be created once(unique)', () => Role.create(roleParams)
          .then(() =>
            // create a second user with same title
             Role.create(roleParams)
              .catch((error) => {
                expect(/UniqueConstraintError/.test(error.name)).to.be.true;
              })));
    });
  });
});
