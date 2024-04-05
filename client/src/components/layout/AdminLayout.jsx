import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  Close,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Groups as GroupsIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent } from "react-router-dom";
import { bgGradient } from "./../../constants/color";

const isAdmin = true

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  border-radius: 2rem;
  padding: 0rem 1rem;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/messages",
    icon: <MessageIcon />,
  },
];

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);
  if(!isAdmin) return <Navigate to="/admin" />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        md={4}
        lg={4}
        sx={{
          display: { xs: "none", sm: "block" },
          backgroundImage: bgGradient,
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={8}
        sx={{
          bgcolor: "#f5f5f5",
        }}
      >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="80vw" />
      </Drawer>
    </Grid>
  );
};

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const logOutHandler = ()=>{}

  return (
    <>
      <Stack width={w} direction={"column"} p={"2rem"}>
        <Typography variant="h5" textTransform={"uppercase"}>
          Chat
        </Typography>
        <Stack
          sx={{
            margin: "1rem 0",
          }}
        >
          {adminTabs.map((tab) => (
            <Link key={tab.path} to={tab.path}
             sx={
              location.pathname === tab.path && {
                bgcolor: '#525050',
                color: 'white',
                ":hover":{color: 'white'}
              }
             }
            >
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                  margin: "1rem 0",
                }}
              >
                {tab.icon}
                <Typography
                  sx={{
                    textDecoration: "none",
                    marginLeft: "1rem",
                  }}
                >
                  {tab.name}
                </Typography>
              </Stack>
            </Link>
          ))}
          <Link onClick={logOutHandler}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{
                  margin: "1rem 0",
                }}
              >
                <ExitToAppIcon />
                <Typography
                  sx={{
                    textDecoration: "none",
                    marginLeft: "1rem",
                  }}
                >
                  LogOut
                </Typography>
              </Stack>
            </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminLayout;
