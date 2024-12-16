import React from "react";
import { Typography, Box } from "@mui/material";

const Inbox = () => {
  return (
    <Box m="5px" marginTop="5%" height="85vh">
      <Typography variant="h4" component="h1" color="blue" fontWeight="bold">
        Inbox
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        color="blue"
        marginBottom="1rem"
      >
        Talk to your collegues
      </Typography>
    </Box>
  );
};

export default Inbox;
