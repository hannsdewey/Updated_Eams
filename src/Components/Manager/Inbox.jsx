import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Divider,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Inbox = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      subject: "Project Update",
      recipient: "Manager",
      messages: [
        { sender: "Manager", text: "Please send the latest project report." },
        { sender: "You", text: "I will send it by EOD." },
      ],
    },
    {
      id: 2,
      subject: "Meeting Schedule",
      recipient: "CEO",
      messages: [
        { sender: "CEO", text: "Can we schedule a meeting for next Monday?" },
        { sender: "You", text: "Sure, what time works for you?" },
      ],
    },
    ...Array.from({ length: 20 }, (_, index) => ({
      id: index + 3,
      subject: `Dummy Conversation ${index + 1}`,
      recipient: `Recipient ${index + 1}`,
      messages: [
        { sender: `Recipient ${index + 1}`, text: `Message ${index + 1}` },
      ],
    })),
  ]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [openNewConversationModal, setOpenNewConversationModal] =
    useState(false);
  const [newRecipient, setNewRecipient] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const handleSelectConversation = (id) => {
    const conversation = conversations.find((conv) => conv.id === id);
    setSelectedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (selectedConversation && messageInput.trim() !== "") {
      const updatedConversations = conversations.map((conv) => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [
              ...conv.messages,
              { sender: "You", text: messageInput.trim() },
            ],
          };
        }
        return conv;
      });
      setConversations(updatedConversations);
      setMessageInput(""); // Clear the input field
    }
  };

  const handleOpenNewConversation = () => {
    setOpenNewConversationModal(true);
  };

  const handleCloseNewConversation = () => {
    setOpenNewConversationModal(false);
    setNewRecipient("");
    setNewSubject("");
  };

  const handleCreateNewConversation = () => {
    if (newRecipient.trim() && newSubject.trim()) {
      const newConversation = {
        id: conversations.length + 1,
        recipient: newRecipient,
        subject: newSubject,
        messages: [],
      };
      setConversations([...conversations, newConversation]);
      handleCloseNewConversation(); // Close the modal
    }
  };

  return (
    <Box display="flex" height="85vh" m="10px" marginTop="5%">
      {/* Left Sidebar: Conversation List */}
      <Box
        width="30%"
        borderRight="1px solid lightgray"
        padding="10px"
        sx={{
          maxHeight: "85vh", // Fixed height for the sidebar
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        {/* Flex container for Inbox title and New button */}
        <Box display="flex" alignItems="center" marginBottom="10px">
          <Typography
            variant="h4"
            component="h1"
            color="blue"
            fontWeight="bold"
            marginBottom="5px"
            flexGrow={1} // Allow title to take most of the space
          >
            Inbox
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenNewConversation}
            size="small"
          >
            New
          </Button>
        </Box>

        <Typography
          variant="subtitle1"
          color="blue"
          marginBottom="10px"
          fontSize="12px"
        >
          Select a conversation to start chatting.
        </Typography>

        <List>
          {conversations.map((conversation) => (
            <ListItem
              button
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation.id)}
              sx={{
                backgroundColor:
                  selectedConversation?.id === conversation.id
                    ? "#e0f7fa"
                    : "inherit",
                borderRadius: "5px",
                mb: "5px",
              }}
            >
              <ListItemText
                primary={conversation.subject}
                secondary={`To: ${conversation.recipient}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Right Panel: Selected Conversation */}
      <Box flex="1" display="flex" flexDirection="column" padding="10px">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <Typography
              variant="h6"
              fontWeight="bold"
              color="blue"
              marginBottom="10px"
            >
              {selectedConversation.subject}
            </Typography>
            <Typography
              variant="body2"
              color="gray"
              marginBottom="20px"
            >{`Conversation with ${selectedConversation.recipient}`}</Typography>
            <Divider />

            {/* Messages Area */}
            <Box
              flex="1"
              overflowY="auto"
              marginBottom="10px"
              sx={{
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "5px",
              }}
            >
              {selectedConversation.messages.map((message, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent={
                    message.sender === "You" ? "flex-end" : "flex-start"
                  }
                  marginBottom="10px"
                >
                  <Paper
                    elevation={2}
                    sx={{
                      padding: "10px",
                      maxWidth: "60%",
                      backgroundColor:
                        message.sender === "You" ? "#d1e7dd" : "#f8d7da",
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {message.sender}
                    </Typography>
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box display="flex" gap="10px">
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography
            variant="body1"
            color="gray"
            textAlign="center"
            marginTop="50px"
          >
            Select a conversation to start chatting.
          </Typography>
        )}
      </Box>

      {/* New Conversation Modal */}
      <Modal
        open={openNewConversationModal}
        onClose={handleCloseNewConversation}
        aria-labelledby="new-conversation-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" marginBottom="20px">
            Create New Conversation
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="recipient-label">Recipient</InputLabel>
            <Select
              labelId="recipient-label"
              value={newRecipient}
              onChange={(e) => setNewRecipient(e.target.value)}
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="CEO">CEO</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateNewConversation}
          >
            Create
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Inbox;
