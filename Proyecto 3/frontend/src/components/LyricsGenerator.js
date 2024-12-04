import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Slider,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { IoSend, IoHeart, IoLogOutOutline, IoAddCircleOutline } from "react-icons/io5";

const PageContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  background: "linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)",
});

const Sidebar = styled(Box)({
  width: "280px",
  backgroundColor: "#ffffff",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid rgba(0, 0, 0, 0.12)",
});

const ChatContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const MessageArea = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  marginBottom: "16px",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#e57373",
    borderRadius: "3px",
  },
});

const MessageBubble = styled(Paper)(({ isUser }) => ({
  padding: "12px 16px",
  borderRadius: isUser ? "20px 20px 0 20px" : "20px 20px 20px 0",
  maxWidth: "70%",
  marginBottom: "12px",
  marginLeft: isUser ? "auto" : "0",
  marginRight: isUser ? "0" : "auto",
  backgroundColor: isUser ? "#d32f2f" : "#ffffff",
  color: isUser ? "#ffffff" : "#000000",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
}));

const InputArea = styled(Box)({
  display: "flex",
  gap: "12px",
  alignItems: "center",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "25px",
    backgroundColor: "#ffffff",
    "&.Mui-focused fieldset": {
      borderColor: "#d32f2f",
    },
  },
});

const SendButton = styled(IconButton)({
  backgroundColor: "#d32f2f",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
});

const AddChatButton = styled(Button)({
  margin: "16px",
  backgroundColor: "#d32f2f",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#d32f2f",
  },
});

const ChatUI = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    const newChat = { id: Date.now(), name: "New Chat", messages: [] };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), text: newMessage, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Set chat name to the first message
    if (chats.length && chats.find((chat) => chat.id === activeChat).name === "New Chat") {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat ? { ...chat, name: newMessage } : chat
        )
      );
    }

    // Add "Loading..." placeholder
    const loadingMessage = { id: Date.now() + 1, text: "Loading...", isUser: false };
    setMessages((prev) => [...prev, loadingMessage]);

    setNewMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate_text", {
        model: "taylor_swift",
        messages: [{ start_string: newMessage }],
        temperature,
      });

      // Replace "Loading..." with the response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.text === "Loading..." ? { ...msg, text: response.data.response } : msg
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.text === "Loading..."
            ? { ...msg, text: "Error: Could not fetch response." }
            : msg
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChatClick = (id) => {
    const selectedChat = chats.find((chat) => chat.id === id);
    setActiveChat(id);
    setMessages(selectedChat.messages);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  return (
    <PageContainer>
      <Sidebar>
        <Typography
          variant="h6"
          sx={{ p: 2, color: "#d32f2f", fontWeight: "bold" }}
        >
          Chats
        </Typography>
        <Divider />
        <List sx={{ flex: 1, overflowY: "auto" }}>
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              button
              onClick={() => handleChatClick(chat.id)}
              sx={{ "&:hover": { backgroundColor: "#ffebee" } }}
            >
              <ListItemText
                primary={chat.name}
                secondary={chat.messages[chat.messages.length - 1]?.text || ""}
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <AddChatButton
          variant="contained"
          startIcon={<IoAddCircleOutline />}
          onClick={handleNewChat}
        >
          New Chat
        </AddChatButton>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom>Temperature: {temperature}</Typography>
          <Slider
            value={temperature}
            onChange={handleTemperatureChange}
            min={0.1}
            max={1.0}
            step={0.1}
            sx={{ color: "#d32f2f" }}
          />
        </Box>
      </Sidebar>

      <ChatContainer>
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 2, color: "#d32f2f", fontWeight: "bold" }}
        >
          Taylor's Version AI <IoHeart style={{ verticalAlign: "middle" }} />
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <MessageArea role="log" aria-label="Chat messages">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              isUser={message.isUser}
              elevation={1}
              role="article"
              aria-label={`${message.isUser ? "Sent" : "Received"} message`}
            >
              <Typography>{message.text}</Typography>
            </MessageBubble>
          ))}
          <div ref={messageEndRef} />
        </MessageArea>

        <InputArea>
          <StyledTextField
            fullWidth
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={4}
            aria-label="Message input"
          />
          <SendButton
            onClick={handleSend}
            disabled={!newMessage.trim()}
            aria-label="Send message"
          >
            <IoSend />
          </SendButton>
        </InputArea>
      </ChatContainer>
    </PageContainer>
  );
};

export default ChatUI;
