import { Box, Typography } from "@mui/material";

function MessageCard({
  message,
  isFromLoggedInUser,
}: {
  message: string;
  isFromLoggedInUser: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isFromLoggedInUser ? "flex-end" : "flex-start",
      }}
    >
      <Typography
        sx={{ background: "#ECECEC", padding: "12px", fontSize: "14px" }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default MessageCard;
