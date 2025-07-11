import { Box, Grid2 as Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import ChatTextField from "../components/ChatPage/ChatTextField";
import LogOutButton from "../components/ChatPage/LogOutButton";
import WelcomeToMaritimeChat from "../components/ChatPage/WelcomeToMaritimeChat";
import UserCard from "../components/ChatPage/UserCard";
import MessageCard from "../components/ChatPage/MessageCard";

import { useSnackbar } from "../context/SnackBarContext";
import { useAuth } from "../context/AuthContext";
import SocketManager from "../hooks/useSocket";

import getUsers, { User } from "../api/getUser";
import getMessages, { Message } from "../api/getMessages";
import logout from "../api/logout";

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const socketManager = useRef<SocketManager | null>(null);

  const snackBar = useSnackbar();

  const { loggedInUserData, setIsAuthenticated } = useAuth() ?? {};

  function onSendMessageHandler(message: string) {
    console.log("selectedUser", selectedUser);
    const messageObject: Message = {
      to: selectedUser!.id,
      from: loggedInUserData!.id,
      message: message,
    };
    setMessages((prev) => [...prev, messageObject]);
    socketManager.current?.sendMessage(messageObject);
  }

  const onLogout = async () => {
    try {
      await logout();
    } finally {
      setIsAuthenticated!(false);
    }
  };

  const onSelectUserHandler = async (user: User) => {
    try {
      setSelectedUser(user);
      const messages = await getMessages(user.id);
      setMessages(messages);
      socketManager.current?.setSelectedUserId(user.id);
    } catch (error) {
      snackBar?.showSnackBarError((error as Error).message);
    }
  };

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      snackBar?.showSnackBarError((error as Error).message);
    }
  };

  useEffect(() => {
    console.log("Should scroll to top", messagesContainerRef.current);
    if (messagesContainerRef.current) {
      console.log("scrolling to top");
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    fetchUsers();
    if (socketManager.current !== null) {
      return;
    }
    socketManager.current = new SocketManager({
      loggedInUserId: loggedInUserData!.id!,
      errorHandler: (error: string) => {
        snackBar?.showSnackBarError(error);
      },
      messageHandler: (message: Message) =>
        setMessages((prev) => [...prev, message]),
      userConnectionStatusHandler(userId, isOnline) {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, isOnline } : user
          )
        );
      },
    });

    return () => {
      socketManager.current?.disconnectAndCleanUp();
      socketManager.current = null;
    };
  }, []);

  function renderNowChattingWithUser() {
    if (!selectedUser) {
      return undefined;
    }

    return (
      <Typography
        sx={{
          padding: "12px",
          fontWeight: "300",
          fontSize: "1rem",
          lineHeight: "24px",
          textAlign: "center",
        }}
      >
        Now Chatting with {selectedUser.username}!
      </Typography>
    );
  }
  function renderWelcomeUser() {
    return (
      <Typography
        sx={{
          padding: "12px",
          fontWeight: "600",
          border: "2px solid",
          borderColor: "#5DADE2",
          borderRadius: "4px",
          textAlign: "center",
        }}
      >
        Welcome, {loggedInUserData!.username}!
      </Typography>
    );
  }

  return (
    <Grid spacing={3} container sx={styles.container}>
      <Grid size={4} gap={"15px"} sx={styles.activeUsersContainer}>
        <Box sx={styles.activeUsersInfoContainer}>
          {renderWelcomeUser()}
          {renderNowChattingWithUser()}
        </Box>
        {users.map((user) => {
          return <UserCard user={user} onSelect={onSelectUserHandler} />;
        })}
      </Grid>
      <Grid
        size={8}
        direction={"column"}
        maxHeight={"100%"}
        sx={styles.messagesContainer}
      >
        <LogOutButton onClick={onLogout} />
        {selectedUser === undefined ? (
          <WelcomeToMaritimeChat />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                padding: "20px",
                flex: 1,
                overflowY: "auto",
              }}
            >
              {messages.map((message) => {
                return (
                  <MessageCard
                    isFromLoggedInUser={message.from === loggedInUserData!.id}
                    message={message.message}
                  />
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChatTextField onSend={onSendMessageHandler} />
            </Box>
          </>
        )}
      </Grid>
    </Grid>
  );
}
export default Chat;

const styles = {
  container: {
    padding: 1,
    display: "flex",
    width: "95vw",
    height: "100vh",
  },
  activeUsersContainer: {
    paddingRight: "10px",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "12px",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#d9d9d9", // Light gray background
      height: "10px",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#bfbfbf", // Darker gray for the scrollbar
      borderRadius: "3px",
    },
  },
  activeUsersInfoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: "white",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
};
