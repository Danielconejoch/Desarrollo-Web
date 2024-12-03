import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Slider,
  Divider,
  Paper,
  Avatar,
  InputAdornment,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { BsFillSendFill, BsSearch, BsThreeDots } from "react-icons/bs";

const drawerWidth = 280;

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#f5f5f5",
  },
}));

const MessageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  gap: "12px",
  flexGrow: 1,
  overflowY: "auto",
}));

const Message = styled(Paper)(({ isUser }) => ({
  padding: "12px",
  maxWidth: "70%",
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? "#1976d2" : "#ffffff",
  color: isUser ? "#ffffff" : "inherit",
  borderRadius: "12px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
}));

const ChatComponent = () => {
  const [message, setMessage] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Taylor Swift Lyrics",
      messages: [
        {
          id: 1,
          text: "¡Hola! Escribe un inicio para la letra de una canción de Taylor Swift.",
          isUser: false,
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: currentChat.messages.length + 1,
      text: message,
      isUser: true,
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    setMessage("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate_text", {
        model: "default",
        messages: [{ start_string: message }],
        temperature,
      });

      const botMessage = {
        id: currentChat.messages.length + 2,
        text: response.data.response || "No se pudo generar una respuesta.",
        isUser: false,
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );
    } catch (error) {
      const errorMessage = {
        id: currentChat.messages.length + 2,
        text: "Error al conectar con el servidor. Por favor, intenta nuevamente.",
        isUser: false,
      };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    }
  };

  const handleTemperatureChange = (_, newValue) => {
    setTemperature(newValue);
  };

  const handleAddChat = () => {
    const newChatId = chats.length + 1;
    const newChat = {
      id: newChatId,
      name: `Chat ${newChatId}`,
      messages: [
        {
          id: 1,
          text: `¡Hola! Escribe un inicio para la letra de una canción de Taylor Swift.`,
          isUser: false,
        },
      ],
    };
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChatId);
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <StyledDrawer variant="permanent" anchor="left">
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search chats"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />
        <List>
          {chats.map((chat) => (
            <ListItem
              button
              key={chat.id}
              onClick={() => handleSelectChat(chat.id)}
              selected={chat.id === currentChatId}
            >
              <ListItemIcon>
                <Avatar sx={{ width: 32, height: 32 }}>{chat.name[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={chat.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Button variant="contained" color="primary" fullWidth onClick={handleAddChat}>
            New Chat
          </Button>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Temperature
          </Typography>
          <Slider
            value={temperature}
            onChange={handleTemperatureChange}
            min={0}
            max={1}
            step={0.1}
            valueLabelDisplay="auto"
            aria-label="Temperature"
          />
        </Box>
      </StyledDrawer>
      <Box sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
        <Paper elevation={0} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              p: 2,
              borderBottom: "1px solid rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{currentChat.name}</Typography>
            <IconButton>
              <BsThreeDots />
            </IconButton>
          </Box>
          <MessageContainer>
            {currentChat.messages.map((msg) => (
              <Message key={msg.id} isUser={msg.isUser}>
                <Typography variant="body1">{msg.text}</Typography>
              </Message>
            ))}
          </MessageContainer>
          <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.12)", mt: "auto" }}>
            <TextField
              fullWidth
              multiline
              rows={2}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSendMessage} disabled={!message.trim()}>
                      <BsFillSendFill />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatComponent;
