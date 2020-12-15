import { ValidationError } from 'yup';

interface Error {
  [key: string]: string;
}

function getValidationErrors(err: ValidationError) {
  const errors: Error = {};

  err.inner.forEach(error => {
    errors[error.path] = error.message;
  })

  return errors;
}

export default getValidationErrors;
