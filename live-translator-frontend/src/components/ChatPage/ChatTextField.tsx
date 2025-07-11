import TelegramIcon from "@mui/icons-material/Telegram";
import { IconButton, InputAdornment } from "@mui/material";

import TextField from "@mui/material/TextField";
import { useState } from "react";

function ChatTextField({ onSend }: { onSend: (message: string) => void }) {
  const [message, setText] = useState("");

  function onTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setText(value);
  }

  function onSendHandler() {
    if (message === "") {
      return;
    }

    onSend(message);
    setText("");
  }

  return (
    <TextField
      fullWidth
      value={message}
      multiline={true}
      maxRows={3}
      onChange={onTextChange}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onSendHandler();
        }
      }}
      sx={{
        border: "1px",
        borderColor: "#E7E7E7",
        borderRadius: 10,
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingRight: "16px",
        paddingLeft: "10px",
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ color: "black" }} onClick={onSendHandler}>
                <TelegramIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default ChatTextField;
