import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import CustomTextField from "../UI/StyledTextField";
import CustomButton from "../UI/StyledButton";

import login from "../../api/login";

const validationSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

function LoginForm({ onLogin }: { onLogin: (token: string) => {} }) {
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Box sx={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setFieldError }) => {
          try {
            const token = await login(values);
            resetForm();
            onLogin(token);
          } catch (error) {
            setFieldError("password", "username of password incorrect");
          }
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          values,
          isSubmitting,
        }) => (
          <Form>
            <CustomTextField
              sx={styles.text}
              fullWidth
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
            />

            <CustomTextField
              sx={styles.text}
              fullWidth
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <CustomButton fullWidth type="submit" disabled={isSubmitting}>
              Login
            </CustomButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Vertically centers the content
    alignItems: "center",
    width: "50vw",
  },
  text: {
    marginBottom: 1,
  },
};

export default LoginForm;
