import request from 'supertest';
import chai from 'chai';
import app from '../../../server';
import db from '../../app/models';
import helper from '../testHelper';

const superRequest = request.agent(app);
const expect = chai.expect;


let newAdminUser;
let adminToken;
let regularToken;
let regularUser;
const emptyValue = ['userName', 'lastName', 'firstName', 'password', 'email'];
const uniqueField = ['userName', 'email'];

describe('User API', () => {
  before((done) => {
    db.Role.bulkCreate([{ title: 'admin', id: 1 }, { title: 'regular', id: 2 }])
    .then((role) => {
      helper.adminUser.roleId = role[0].id;
      db.User.create(helper.adminUser)
        .then((admin) => {
          newAdminUser = admin.dataValues;
          done();
        });
    });
  });

  after(() => {
    db.Role.destroy({ where: {} });
  });

  describe('New Users', () => {
    describe('Create User', () => {
      it('should create a user', (done) => {
        superRequest.post('/users')
          .send(helper.regularUser)
          .end((error, response) => {
            regularUser = response.body.user;
            expect(response.status).to.equal(201);
            expect(response.body.user.userName)
              .to.equal(helper.regularUser.userName);
            expect(response.body.user.firstName)
              .to.equal(helper.regularUser.firstName);
            expect(response.body.user.lastName)
              .to.equal(helper.regularUser.lastName);
            expect(response.body.user.roleId).to.equal(2);
            done();
          });
      });

      uniqueField.forEach((field) => {
        const uniqueUser = Object.assign({}, helper.firstUser);
        uniqueUser[field] = helper.testUser[field];
        it.only(`should fail when already existing ${field} is supplied`, (done) => {
          superRequest.post('/users')
            .send(uniqueUser)
            .end((err, res) => {
              expect(res.status).to.equal(409);
              expect(res.body.message).to
                .equal(`${field} already exists`);
              done();
            });
        });
      });

      emptyValue.forEach((field) => {
        const invalidUser = Object.assign({}, helper.secondUser);
        invalidUser[field] = '';
        it(`should fail when ${field} is invalid`, (done) => {i
          superRequest.post('/users')
            .send(invalidUser)
            .end((err, res) => {
              expect(res.status).to.equal(400);
              expect(res.body.message).to
                .equal(`Enter a valid ${field}`);
              done();
            });
        });
      });
      it('should not allow admin user to sign up', (done) => {
        helper.firstUser.roleId = 1;
        superRequest.post('/users')
          .send(helper.firstUser)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.message).to
              .equal('Permission denied, You cannot sign up as an admin user');
            done();
          });
      });
    });
  });
});

// describe('Existing users', () => {
//   describe('Login /users/login', () => {
//     it('should allow admin user to login', (done) => {
//       superRequest.post('/users/login')
//           .send(helper.adminUser)
//           .end((err, res) => {
//             adminToken = res.body.token;
//             expect(res.status).to.equal(200);
//             expect(res.body.token).to.not.equal(null);
//             expect(res.body.message).to
//               .equal('You have successfully logged in');
//             done();
//           });
//     });
//   });
// });

// it('should allow other users to login', (done) => {
//   superRequest.post('/users/login')
//           .send(helper.regularUser)
//           .end((err, res) => {
//             regularToken = res.body.token;
//             expect(res.status)
//               .to.equal(200);
//             expect(res.body.token)
//               .to.not.equal(null);
//             expect(res.body.message)
//               .to.equal('You have successfully logged in');
//             done();
//           });
// });
