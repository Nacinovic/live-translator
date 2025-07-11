import * as yup from 'yup';

// Define the validation schema for the POST body
export const querySchema = yup.object().shape({
    recipientId: yup.string(),
});

export type MessagesQuerySchema = yup.InferType<typeof querySchema>;