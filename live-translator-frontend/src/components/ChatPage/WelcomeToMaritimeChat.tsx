import { Box, Link, Typography } from "@mui/material";

function WelcomeToMaritimeChat() {
  return (
    <Box sx={{ width: "100%" }}>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        Welcome to Maritime Chat!
      </h1>
      <Typography>
        <Link underline="none">Select a user to start chatting</Link> and
        connect seamlessly with fellow seafarers around the world. The system
        will translate messages into their preferred language. Break down
        language barriers and keep the conversation flowing!
      </Typography>
    </Box>
  );
}

export default WelcomeToMaritimeChat;
