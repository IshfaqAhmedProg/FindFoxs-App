import React, { useState } from "react";
import {
  Box,
  Tooltip,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import ContactMailIcon from "@mui/icons-material/ContactMailRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgentRounded";
import NotificationsIcon from "@mui/icons-material/NotificationsRounded";
import ConstructionIcon from "@mui/icons-material/ConstructionRounded";
import HelpIcon from "@mui/icons-material/HelpRounded";
import Settings from "@mui/icons-material/SettingsRounded";
import Logout from "@mui/icons-material/LogoutRounded";
import { NavDrawer } from "./NavDrawer";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import { NavLinks } from "@/shared/interfaces/NavLinks";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function UserControls({ container }: { container: any }) {
  const router = useRouter();
  const { logout } = useAuth();
  const drawerWidth = 240;
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [accountOpenAnchor, setAccountOpenAnchor] =
    useState<null | HTMLElement>(null);
  const navLinks: Array<NavLinks> = [
    { name: "Dashboard", goto: "/dashboard", icon: <HomeIcon /> },
    { name: "Leads Search", goto: "/leads-search", icon: <InfoIcon /> },
    { name: "Engage", goto: "/engage", icon: <ContactMailIcon /> },
    { name: "Tools", goto: "/tools", icon: <ConstructionIcon /> },
    { name: "Support", goto: "/support", icon: <SupportAgentIcon /> },
  ];
  function handleDrawerToggle() {
    setDrawerToggle((prev) => !prev);
  }
  function handleAccountClick(event: React.MouseEvent<HTMLElement>) {
    setAccountOpenAnchor(event.currentTarget);
  }
  function handleClose() {
    setAccountOpenAnchor(null);
  }
  function handleLogout() {
    logout().then(router.replace("/"));
    handleClose();
  }

  function handleNotificationClick() {}
  function handleHelpCenterClick() {}
  const accountOpen = Boolean(accountOpenAnchor);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: { sm: 1 },
          alignItems: "center",
        }}
      >
        <Tooltip title="Help Center">
          <IconButton onClick={handleHelpCenterClick}>
            <HelpIcon color="disabled" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton onClick={handleNotificationClick}>
            <Badge badgeContent={17} variant="dot" color="error">
              <NotificationsIcon color="disabled" />
            </Badge>
          </IconButton>
        </Tooltip>

        <Tooltip title="Account Settings">
          <IconButton
            onClick={handleAccountClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={accountOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={accountOpen ? "true" : undefined}
          >
            <Avatar {...stringAvatar("Ishfaq Ahmed")} />
          </IconButton>
        </Tooltip>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 0.5 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <SwipeableDrawer
        anchor="right"
        container={container}
        variant="temporary"
        disableSwipeToOpen={true}
        open={drawerToggle}
        onOpen={handleDrawerToggle}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <NavDrawer
          drawerItems={navLinks}
          handleDrawerToggle={handleDrawerToggle}
        />
      </SwipeableDrawer>
      <Menu
        anchorEl={accountOpenAnchor}
        id="account-menu"
        open={accountOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 0px 2px rgba(0,0,0,0.15))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
