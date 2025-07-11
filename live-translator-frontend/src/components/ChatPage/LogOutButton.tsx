import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function LogOutButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      sx={{
        padding: "12px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <Typography sx={{ marginRight: "8px" }}>Log out</Typography>
      <LogoutIcon onClick={onClick} />
    </Box>
  );
}

export default LogOutButton;
