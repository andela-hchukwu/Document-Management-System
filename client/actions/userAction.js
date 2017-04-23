// import request from 'superagent';
// import toastr from 'toastr';
// import * as ActionTypes from './actionTypes';
// import { errorMessage } from '../util/util';

// export const signUpRequest = () => ({
//   type: ActionTypes.SIGN_UP_REQUEST });
// export const signUpSuccessful = user => ({
//   type: ActionTypes.SIGN_UP_SUCCESSFUL, response: user,
// });
// export const signUpError = error => ({
//   type: ActionTypes.SIGN_UP_FAIL, error,
// });

// export const loginRequest = () => ({
//   type: ActionTypes.LOGIN_REQUEST,
// });
// export const loginSuccessful = user => ({
//   type: ActionTypes.LOGIN_SUCCESSFUL, response: user,
// });
// export const loginError = error => ({
//   type: ActionTypes.LOGIN_FAIL, error,
// });

// export const handleSignUp =
// (userName, firstName, lastName, password, email) =>
//   (dispatch) => {
//     dispatch(signUpRequest());
//     return (request.post('/users').send({
//       userName,
//       firstName,
//       lastName,
//       password,
//       email,
//     }).then((response) => {
//       localStorage.setItem('token', response.body.token);
//       toastr.success('Sign up successful');
//       return dispatch(signUpSuccessful(response.body));
//     }, (error) => {
//       const errorMsg = errorMessage(error);
//       toastr.error(errorMsg);
//       return dispatch(signUpError(errorMsg));
//     }));
//   };

// export const handleLogin = (email, password) => (dispatch) => {
//   dispatch(loginRequest());
//   return (request.post('/users/login')
//     .send({ email, password }).then((response) => {
//       localStorage.setItem('token', response.body.token);
//       toastr.success('Login successful');
//       return dispatch(loginSuccessful(response.body));
//     }, (error) => {
//       const errorMsg = error.response.body.message;
//       toastr.error(errorMsg);
//       return dispatch(loginError(error));
//     }));
// };
