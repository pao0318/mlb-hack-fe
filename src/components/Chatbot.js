import React, { useState } from "react";
import { Box, Fab, TextField, IconButton, Typography, Link } from "@mui/material";
import { Send, Chat } from "@mui/icons-material";
import { useThemeContext } from "../themeContext";
import { ragApi } from "../api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { darkMode } = useThemeContext();

  const getBotResponse = async (message) => {
    try {
      const response = await ragApi({ query: message });
      console.log("Response from API:", response);
  
      // Parse the response to extract the `answer` field
      const parsedResponse = JSON.parse(response.response);
      if (!parsedResponse?.answer) {
        throw new Error("Invalid response format");
      }
  
      return parsedResponse;
    } catch (error) {
      console.error("Error in getting bot response:", error);
      return {
        answer: "Sorry, I couldn't process your request. Please try again later.",
        metadata: null
      };
    }
  };
  
  const handleSendMessage = async () => {
    if (input.trim() === "") return;
  
    // Add user message to the chat
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input immediately for better UX
  
    // Get bot response
    const botResponse = await getBotResponse(input);
  
    const botMessage = {
      sender: "bot",
      text: botResponse.answer, // Use the `answer` field here
      metadata: botResponse.metadata
    };
  
    // Add bot message to the chat
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <Chat />
      </Fab>

      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            width: 300,
            zIndex: 1,
            height: 400,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            bgcolor: darkMode ? "grey.800" : "white",
            color: darkMode ? "white" : "black",
            boxShadow: 4,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              padding: 1,
              bgcolor: darkMode ? "grey.900" : "primary.main",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle1">Chatbot</Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 1,
              backgroundColor: darkMode ? "grey.800" : "white",
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "75%",
                    padding: 1,
                    borderRadius: 2,
                    bgcolor:
                      message.sender === "user"
                        ? darkMode
                          ? "primary.dark"
                          : "primary.light"
                        : darkMode
                        ? "grey.700"
                        : "grey.300",
                    color: message.sender === "user" 
                      ? "white" 
                      : darkMode ? "white" : "black",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  
                  {message.metadata && (
                    <Box
                      sx={{
                        mt: 1,
                        padding: 1,
                        borderRadius: 1,
                        bgcolor: darkMode ? "grey.600" : "grey.200",
                        fontSize: "0.8rem",
                      }}
                    >
                      <Typography variant="caption" display="block">
                        Type: {message.metadata.type}
                      </Typography>
                      {message.metadata.details && (
                        <Typography variant="caption" display="block">
                          {message.metadata.details}
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 1,
              borderTop: `1px solid ${darkMode ? "grey.700" : "grey.300"}`,
              bgcolor: darkMode ? "grey.800" : "white",
            }}
          >
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              placeholder="Type a message..."
              variant="outlined"
              sx={{
                bgcolor: darkMode ? "grey.900" : "grey.100",
                borderRadius: 1,
                marginRight: 1,
              }}
            />
            <IconButton color="primary" onClick={handleSendMessage}>
              <Send />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Chatbot;