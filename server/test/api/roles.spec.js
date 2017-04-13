// import request from 'supertest';
// import chai from 'chai';
// import app from '../../../server';
// import db from '../../app/models';
// import helper from '../testHelper';

// const superRequest = request.agent(app);
// const expect = chai.expect;

// const adminParams = helper.firstUser;
// const adminRoleParams = helper.adminRole;
// const regularRoleParams = helper.regularRole;

// let adminToken, reguToken;
// let role;

// describe('ROLE API', () => {
//   before((done) => {
//     db.Role.create(adminRoleParams)
//       .then((newRole) => {
//         adminParams.roleId = newRole.id;
//         db.User.create(adminParams)
//           .then(() => {
//             superRequest.post('/users/login')
//               .send(adminParams)
//               .end((err, res) => {
//                 adminToken = res.body.token;
//                 done();
//               });
//           });
//       });
//   });

//   after(() => db.Role.destroy({ where: {} }));

//   describe('ADMIN', () => {
//     it('should allow admin to create a role', (done) => {
//       superRequest.post('/roles')
//         .send(regularRoleParams)
//         .set({ 'x-access-token': adminToken })
//         .end((err, res) => {
//           expect(res.status).to.equal(201);
//           expect(res.body.role.title).to.equal(regularRoleParams.title);
//           done();
//         });
//     });

//     it('should return error when role title already exist', (done) => {
//       regularRoleParams.id = 44;
//       superRequest.post('/roles')
//         .send(regularRoleParams)
//         .set({ 'x-access-token': adminToken })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.errorArray[0].message).to.equal('title must be unique');
//           done();
//         });
//     });
//   });
// });

// it('should return error for empty string title', (done) => {
//   superRequest.post('/roles')
//         .send({ title: '' })
//         .set({ 'x-access-token': adminToken })
//         .end((err, res) => {
//           expect(res.status).to.equal(400);
//           expect(res.body.errorArray[1].message).to
//             .equal('This field cannot be empty');
//           done();
//         });
// });
