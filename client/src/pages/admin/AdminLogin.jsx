import { useInputValidation } from "6pp";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";

const isAdmin = true

const AdminLogin = () => {
  const secretKey = useInputValidation();

  const submithandler = (e) => {
    e.preventDefault();
  };

  if(isAdmin) return <Navigate to='/admin/dashboard' />

  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgb(0, 212, 255) 0%, rgb(125 125 178) 35%, rgb(33 162 33) 100%)",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Panel</Typography>
          <form
            onSubmit={submithandler}
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <TextField
              label="Secret Key"
              type="password"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default AdminLogin;
