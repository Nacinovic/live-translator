import { Button } from "@mui/material";

import { User } from "../../api/getUser";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

function UserCard({
  user,
  onSelect,
}: {
  user: User;
  onSelect: (user: User) => void;
}) {
  function onClickHandler() {
    onSelect(user);
  }
  return (
    <Button
      fullWidth
      onClick={onClickHandler}
      sx={{
        justifyContent: "start",
        backgroundColor: user.isOnline ? "#C8E6C9" : "#E7E7E7",
        border: "1px",
        padding: "12px",
        borderRadius: "4px",
      }}
    >
      <PermIdentityOutlinedIcon sx={{ color: "#63666A" }} />
      <span
        style={{
          display: "inline",
          color: "black",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        {user.username}
        <span style={{ fontWeight: "400" }}>-{user.language}</span>
      </span>
    </Button>
  );
}

export default UserCard;
