import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { usernameValidator } from "../utils/validatores";

const Login = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single", 20);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );

      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {  
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally { 
      setIsLoading(false);
    }
  };

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
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                onSubmit={handleLogIn}
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  label="Username"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
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
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button variant="text" fullWidth onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Register</Typography>
              <form
                onSubmit={handleSignUp}
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <Stack position={"relative"} margin={"auto"} width={"10rem"}>
                  <Avatar
                    alt="Profile Picture"
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />
                  <IconButton
                    sx={{
                      bottom: "0",
                      right: "0",
                      component: "label",
                    }}
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                  {avatar.error && (
                    <Typography
                      color="error"
                      variant="caption"
                      m={"1rem auto"}
                      width={"fit-content"}
                      display={"block"}
                    >
                      {avatar.error}
                    </Typography>
                  )}
                </Stack>
                <TextField
                  label="Name"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  label="Bio"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  label="Username"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error}
                  </Typography>
                )}
                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Sign Up
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button variant="text" onClick={toggleLogin} fullWidth>
                  Log In Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
