const expect = require('chai').expect;
const models = require('../../app/models');

describe('Created Models', () => {
  it('should have User Model Created', () => {
    expect(models.Users).to.exist;
    expect(models.Roles).to.exist;
    expect(models.Documents).to.exist;
  });
});
