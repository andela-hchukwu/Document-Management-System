const expect = require('chai').expect;
const user = require('../../app/models').Users;
const params = require('../testHelper.js').testUser;


describe('User Model', () => {
  const User = user.build(params);

  describe('How User Model Works', () => {
    it('should be able to create an instance of \'user\' for this test', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(User).not.to.be.null;
    });
    it('should create a user instance with all required fields', () => {
      expect(User.userName).to.equal(params.userName);
      expect(User.firstName).to.equal(params.firstName);
      expect(User.lastName).to.equal(params.lastName);
      expect(User.email).to.equal(params.email);
      expect(User.password).to.equal(params.password);
      expect(User.role).to.equal(params.role);
    });
  });
});
