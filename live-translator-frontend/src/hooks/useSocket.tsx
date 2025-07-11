import { io, Socket } from "socket.io-client";
import { Message } from "../api/getMessages";

type ErrorHandler = (error: string) => void;
type MessageHandler = (message: Message) => void;
type UserConnectionStatusHandler = (userId: string, isOnline: boolean) => void;

class SocketManager {
  private socket: Socket;
  private loggedInUserId: string;
  private selectedUserId: string | undefined;

  private errorHandler: ErrorHandler;
  private messageHandler: MessageHandler;
  private userConnectionStatusHandler: UserConnectionStatusHandler;

  constructor(props: {
    loggedInUserId: string;
    errorHandler: ErrorHandler;
    messageHandler: MessageHandler;
    userConnectionStatusHandler: UserConnectionStatusHandler;
  }) {
    this.socket = io(`${process.env.REACT_APP_API_URL}`, {
      withCredentials: true,
    });

    console.log("Initing sockt");
    const {
      loggedInUserId,
      errorHandler,
      messageHandler,
      userConnectionStatusHandler,
    } = props;

    this.loggedInUserId = loggedInUserId;
    this.errorHandler = errorHandler;
    this.messageHandler = messageHandler;
    this.userConnectionStatusHandler = userConnectionStatusHandler;

    // this.socket.on("connect", () => {
    console.log("connected");
    this.socket.on("userConnected", (userId: string) => {
      this.userConnectionStatusHandler(userId, true);
    });
    this.socket.on("userDisconnected", (userId: string) => {
      this.userConnectionStatusHandler(userId, false);
    });
    this.socket.on("connect_error", (error) => {
      this.errorHandler("Something went wrong !!!");
      console.log(error);
    });

    this.socket.on("disconnect", () => {
      this.errorHandler("Socket disconnected");
    });

    this.socket?.on("message", (data) => {
      const message = JSON.parse(data) as Message;

      if (this.selectedUserId === undefined) {
        this.errorHandler("Please select a user first.");
        return;
      }

      if (message.from !== this.selectedUserId) {
        return;
      }

      this.messageHandler(message);
    });
  }

  setSelectedUserId(id: string) {
    this.selectedUserId = id;
  }

  sendMessage(message: Message) {
    this.socket.emit("message", message);
  }
  disconnectAndCleanUp() {
    this.socket?.disconnect();
  }
}

export default SocketManager;
