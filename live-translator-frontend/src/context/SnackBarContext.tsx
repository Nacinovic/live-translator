import { createContext, ReactNode, useContext, useState } from "react";

import { Snackbar } from "@mui/material";

const SnackbarContext = createContext<
  | {
      showSnackbarInfo(message: string): void;
      showSnackBarError(message: string): void;
      hideSnackbar(): void;
    }
  | undefined
>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

// SnackbarProvider Component
export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    error: Boolean;
  }>({
    open: false,
    message: "",
    error: false,
  });

  const showSnackbarInfo = (message: string) => {
    setSnackbar({ open: true, message, error: false });
  };

  const showSnackBarError = (message: string) => {
    setSnackbar({ open: true, message, error: true });
  };

  const hideSnackbar = () => {
    console.log("hidin snackbar");
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider
      value={{ showSnackbarInfo, showSnackBarError, hideSnackbar }}
    >
      {children}
      <Snackbar
        message={snackbar.message}
        open={snackbar.open}
        autoHideDuration={3000}
        disableWindowBlurListener={true}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      ></Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
