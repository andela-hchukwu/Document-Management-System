import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.userName)) {
    errors.userName = 'Username is required';
  }
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
