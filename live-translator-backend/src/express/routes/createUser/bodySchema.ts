import * as yup from 'yup';
import availableLanguages from '../../../utils/availableLanguages'

export const createUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  username: yup.string().min(3).max(30).required('Username is required'),
  password: yup.string().required(),
  language: yup.string().required().oneOf(availableLanguages)
});

export type CreateUserParams = yup.InferType<typeof createUserSchema>;