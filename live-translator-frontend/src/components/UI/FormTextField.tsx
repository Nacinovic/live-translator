import { FormikProps } from "formik";
import { InputAdornment, TextFieldProps } from "@mui/material";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import RemoveModeratorOutlinedIcon from "@mui/icons-material/RemoveModeratorOutlined";

import CustomTextField from "./StyledTextField";

function FormTextField({
  formik,
  id,
}: {
  formik: FormikProps<any>;
  id: string;
}) {
  function getAdornmentIconForTextFieldWithId(id: string) {
    if (id === "username") {
      return <PersonOutlineOutlinedIcon />;
    } else if (id === "email") {
      return <EmailOutlinedIcon />;
    } else if (id === "password") {
      return <RemoveModeratorOutlinedIcon />;
    }
  }

  function generatePropsForTextFieldWithId(id: string): TextFieldProps {
    const helperText = formik.errors[id] as string;
    return {
      ...(id === "password" ? { type: "password" } : undefined),
      ...(id === "email" ? { type: "email" } : undefined),
      fullWidth: true,
      id: id,
      name: id,
      placeholder: id.charAt(0).toUpperCase() + id.slice(1).toLowerCase(),
      value: formik.values[id],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.submitCount > 0 && Boolean(formik.errors[id]),
      helperText: formik.submitCount > 0 && helperText,
      slotProps: {
        input: {
          startAdornment: (
            <InputAdornment position="start">
              {getAdornmentIconForTextFieldWithId(id)}
            </InputAdornment>
          ),
        },
      },
    };
  }

  return (
    <CustomTextField
      sx={{ marginBottom: "10px" }}
      {...generatePropsForTextFieldWithId(id)}
    />
  );
}

export default FormTextField;
