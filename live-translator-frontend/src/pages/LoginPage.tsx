import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import MaritimeChatTitle from "../components/UI/MaritimeChatTitle";
import FormTextField from "../components/UI/FormTextField";
import StyledButton from "../components/UI/StyledButton";

import { useSnackbar } from "../context/SnackBarContext";
import { useAuth } from "../context/AuthContext";

import login from "../api/login";

function LoginPage() {
  const navigation = useNavigate();

  const { setIsAuthenticated } = useAuth() ?? {};
  const snackBar = useSnackbar();

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        await login(values);
        setIsAuthenticated!(true);
        navigation("/chat");
      } catch (error) {
        snackBar?.showSnackBarError((error as Error).message);
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "477px",
      }}
    >
      <MaritimeChatTitle paragraphText="Log In to Your Account" />
      <form onSubmit={formik.handleSubmit}>
        <FormTextField formik={formik} id="username" />
        <FormTextField formik={formik} id="password" />
        <StyledButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Log In
        </StyledButton>

        <p
          style={{
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#63666A",
          }}
        >
          Forgot your login details?{" "}
          <a style={{ color: "#00B5E2" }} href="/forgot-password">
            Click here to reset your password.
          </a>
        </p>
      </form>
    </Box>
  );
}
export default LoginPage;
