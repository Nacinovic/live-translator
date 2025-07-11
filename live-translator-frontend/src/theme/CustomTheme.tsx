import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        },
      },
    },
  },
});

//   {
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: {
//           background: "#202020",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           background: "#575151",
//           color: "white",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           background: "#575151",
//           "& .MuiInputBase-input": {
//             color: "#ffffff", // Text color
//           },
//           "& .MuiInputLabel-root": {
//             color: "#aaaaaa", // Label color
//           },
//           "& .MuiOutlinedInput-root": {
//             "&.Mui-focused fieldset": {
//               borderWidth: 0,
//             },
//           },
//         },
//       },
//     },
//   },
//   palette: {
//     background: {
//       default: "#202020",
//     },
//   },
// }

export default theme;
