import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { Box } from "@mui/material";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/subscription", { email });
      setSuccessMessage(response.data.message);
      setEmail("");
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Get Email Updates from Jaya's Blog
        </Typography>
        <Typography gutterBottom sx={{ textAlign: "center" }}>
          Jays's Blog shares more in her emails. Get travel tips, exclusive
          stories, and more.
        </Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Enter your email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ textAlign: "center", mb: 2 }}
            />
          </div>
          <div>
            <Button
              sx={{ mb: 2 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Subscribe
            </Button>
          </div>
        </form>
        {successMessage && (
          <Typography sx={{ mt: 2, color: "green" }}>
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography sx={{ mt: 2, color: "red" }}>{errorMessage}</Typography>
        )}
      </Box>
    </>
  );
};

export default SubscriptionForm;
