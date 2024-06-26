import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";
import {
  Menu,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogOuticon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { server } from "../../constants/config";

const SearchDialog = lazy(()=> import('../specific/Search'))
const NotificationsDialog = lazy(()=> import('../specific/Notifications'))
const NewGroupDialog = lazy(()=> import('../specific/NewGroup'))



const Header = () => {
  const dispatch = useDispatch()
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile((prev)=>!prev)
  };

  const openSearch = () => {
    setIsSearch((prev)=>!prev)
  };

  const openNewGroup = () => {
    setIsNewGroup((prev)=>!prev)
  };

  const openNotification = () => {
    setIsNotification((prev)=>!prev)
  };

  const logOutHandler = async() => {
    try {
      const {data} = await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true })
      dispatch(userNotExists())
      toast.success(data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong");
    }
  };

  const navigateToGroup = () => {
    navigate("/groups");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chat Application
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Groups"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogOuticon />}
                onClick={logOutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {
        isSearch && ( <Suspense fallback={<Backdrop open />}> <SearchDialog /> </Suspense>)
      }
      {
        isNotification && ( <Suspense fallback={<Backdrop open />}> <NotificationsDialog /> </Suspense>)
      }
      {
        isNewGroup && ( <Suspense fallback={<Backdrop open />}> <NewGroupDialog /> </Suspense>)
      }
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
