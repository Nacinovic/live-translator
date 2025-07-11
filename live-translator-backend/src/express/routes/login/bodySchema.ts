import * as yup from 'yup';

// Define the validation schema for the POST body
export const loginSchema = yup.object().shape({
  username: yup.string().min(3).max(30).required('Username is required'),
  password: yup.string().required(),
});

export type LoginUserParams = yup.InferType<typeof loginSchema>;