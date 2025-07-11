import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";

import theme from "./theme/CustomTheme";

import { ThemeProvider } from "@emotion/react";

import { SnackbarProvider } from "./context/SnackBarContext";
import { AuthProvider } from "./context/AuthContext";

import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Login />} />

              <Route
                path="/chat"
                element={<ProtectedRoute element={<Chat />} />}
              />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
