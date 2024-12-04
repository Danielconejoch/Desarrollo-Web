import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  position: "relative",
});

const LogoutButton = styled(Button)({
  position: "absolute",
  top: "16px",
  right: "16px",
  backgroundColor: "#d32f2f",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#b71c1c",
  },
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
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.email || "default_user";
  const [chats, setChats] = useState(() => {
    const savedChats = JSON.parse(localStorage.getItem("userChats")) || {};
    return savedChats[userId] || [{ id: Date.now(), name: "New Chat", messages: [{ id: 1, text: "Welcome to Taylor's Version AI!", isUser: false }] }];
  });
  const [activeChat, setActiveChat] = useState(chats[0]?.id || null);
  const [newMessage, setNewMessage] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChat]);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("userChats")) || {};
    savedChats[userId] = chats;
    localStorage.setItem("userChats", JSON.stringify(savedChats));
  }, [chats, userId]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: "New Chat",
      messages: [{ id: 1, text: "Welcome to Taylor's Version AI!", isUser: false }],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setActiveChat(newChat.id);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage = { id: Date.now(), text: newMessage, isUser: true };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    if (chats.find((chat) => chat.id === activeChat)?.name === "New Chat") {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat ? { ...chat, name: newMessage } : chat
        )
      );
    }

    const loadingMessage = { id: Date.now() + 1, text: "Loading...", isUser: false };
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, loadingMessage] }
          : chat
      )
    );

    setNewMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate_text", {
        model: "taylor_swift",
        messages: [{ start_string: newMessage }],
        temperature,
      });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.text === "Loading..."
                    ? { ...msg, text: response.data.response }
                    : msg
                ),
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: chat.messages.map((msg) =>
                  msg.text === "Loading..."
                    ? { ...msg, text: "Error: Could not fetch response." }
                    : msg
                ),
              }
            : chat
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
    setActiveChat(id);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleLogout = () => {
    const savedChats = JSON.parse(localStorage.getItem("userChats")) || {};
    savedChats[userId] = chats;
    localStorage.setItem("userChats", JSON.stringify(savedChats)); // Guardar chats al hacer logout
    navigate("/");
  };

  return (
    <PageContainer>
      <Sidebar>
        <Typography variant="h6" sx={{ p: 2, color: "#d32f2f", fontWeight: "bold" }}>
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
                primaryTypographyProps={{ fontWeight: "medium" }}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <AddChatButton variant="contained" startIcon={<IoAddCircleOutline />} onClick={handleNewChat}>
          New Chat
        </AddChatButton>
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom>Temperature: {temperature}</Typography>
          <Slider value={temperature} onChange={handleTemperatureChange} min={0.1} max={1.0} step={0.1} sx={{ color: "#d32f2f" }} />
        </Box>
      </Sidebar>

      <ChatContainer>
        <LogoutButton variant="contained" startIcon={<IoLogOutOutline />} onClick={handleLogout}>
          Logout
        </LogoutButton>
        <Typography variant="h5" component="h1" sx={{ mb: 2, color: "#d32f2f", fontWeight: "bold" }}>
          Taylor's Version AI <IoHeart style={{ verticalAlign: "middle" }} />
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <MessageArea role="log" aria-label="Chat messages">
          {chats.find((chat) => chat.id === activeChat)?.messages.map((message) => (
            <MessageBubble key={message.id} isUser={message.isUser} elevation={1} role="article" aria-label={`${message.isUser ? "Sent" : "Received"} message`}>
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
          <SendButton onClick={handleSend} disabled={!newMessage.trim()} aria-label="Send message">
            <IoSend />
          </SendButton>
        </InputArea>
      </ChatContainer>
    </PageContainer>
  );
};

export default ChatUI;
