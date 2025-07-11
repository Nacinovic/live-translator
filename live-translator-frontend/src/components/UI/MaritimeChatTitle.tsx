import { Container } from "@mui/material";

function MaritimeChatTitle({ paragraphText }: { paragraphText: string }) {
  function renderAnchorIcon() {
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28.3333 25L30.9167 27.5833C29.3167 30.4 25.3667 32.65 21.6667 33.2V18.3333H26.6667V15H21.6667V13.0333C23.6 12.3333 25 10.5 25 8.33334C25 5.58334 22.75 3.33334 20 3.33334C17.25 3.33334 15 5.58334 15 8.33334C15 10.5 16.4 12.3333 18.3333 13.0333V15H13.3333V18.3333H18.3333V33.2C14.6333 32.65 10.6833 30.4 9.08333 27.5833L11.6667 25L5 20V25C5 31.4667 13.2 36.6667 20 36.6667C26.8 36.6667 35 31.4667 35 25V20L28.3333 25ZM20 6.66667C20.9167 6.66667 21.6667 7.41667 21.6667 8.33334C21.6667 9.25 20.9167 10 20 10C19.0833 10 18.3333 9.25 18.3333 8.33334C18.3333 7.41667 19.0833 6.66667 20 6.66667Z"
          fill="#00B5E2"
        />
      </svg>
    );
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderAnchorIcon()}
        <h1 style={{ fontSize: "37px", color: "#00B5E2", lineHeight: "36px" }}>
          Maritime chat
        </h1>
      </Container>
      <p
        style={{
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "600",
          lineHeight: "24px",
        }}
      >
        {paragraphText}
      </p>
    </>
  );
}

export default MaritimeChatTitle;
