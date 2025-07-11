import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { languages as tLanguages } from "countries-list";
import { useNavigate } from "react-router-dom";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";

import MaritimeChatTitle from "../components/UI/MaritimeChatTitle";
import FormTextField from "../components/UI/FormTextField";
import StyledButton from "../components/UI/StyledButton";

import { useSnackbar } from "../context/SnackBarContext";

import createUser from "../api/createUser";
function LoginForm() {
  const navigation = useNavigate();
  const snackBar = useSnackbar();

  const languages = Object.values(tLanguages).map((elem) => elem.name);
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Too short")
      .max(15, "Too long")
      .required("Username is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    language: Yup.string().required("language is required").oneOf(languages),
    password: Yup.string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      language: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUser(values);
        snackBar?.showSnackbarInfo("Account created, please login");
        formik.resetForm();
        navigation("/");
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
      <MaritimeChatTitle paragraphText="Create Your Profile" />
      <form style={{ padding: 20 }} onSubmit={formik.handleSubmit}>
        <FormTextField formik={formik} id="username" />
        <FormTextField formik={formik} id="email" />
        <FormTextField formik={formik} id="password" />
        <FormControl
          sx={{ width: "100%" }}
          error={formik.touched.language && Boolean(formik.errors.language)}
        >
          <InputLabel
            variant="filled"
            htmlFor="language"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TranslateOutlinedIcon style={{ marginRight: "10px" }} />
            {formik.values.language ? (
              ""
            ) : (
              <span style={{ fontWeight: "300" }}>Preferred Language</span>
            )}
          </InputLabel>
          <Select
            id="language"
            name="language"
            value={formik.values.language}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {languages.map((language, index) => (
              <MenuItem key={index} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched.language && formik.errors.language}
          </FormHelperText>
        </FormControl>
        <StyledButton
          sx={{ marginTop: "20px" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Create Account
        </StyledButton>
        <p
          style={{
            textAlign: "center",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#63666A",
          }}
        >
          You have account?{" "}
          <a style={{ color: "#00B5E2" }} href="/login">
            Login now
          </a>
        </p>
      </form>
    </Box>
  );
}
export default LoginForm;
