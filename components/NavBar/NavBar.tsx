import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  SvgIconProps,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import ContactMailIcon from "@mui/icons-material/ContactMailRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgentRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HelpIcon from "@mui/icons-material/Help";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { NavDrawer } from "./NavDrawer";
import Image from "next/image";
import Logo from "../../public/Logos/ScrapeFoxLogo.svg";
import Link from "next/link";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import { SearchBar } from "./SearchBar";
import { useRouter } from "next/router";
interface Props {
  window?: () => Window;
}
export interface NavLinks {
  name: string;
  goto: string;
  icon: React.ReactElement<SvgIconProps>;
}
export default function NavBar(props: Props) {
  const { window } = props;
  const drawerWidth = 240;
  const [drawerToggle, setDrawerToggle] = useState(false);
  const [accountOpenAnchor, setAccountOpenAnchor] =
    useState<null | HTMLElement>(null);
  const router = useRouter();
  const navLinks: Array<NavLinks> = [
    { name: "Dashboard", goto: "/", icon: <HomeIcon /> },
    { name: "Leads Search", goto: "/leads-search", icon: <InfoIcon /> },
    { name: "Engage", goto: "/engage", icon: <ContactMailIcon /> },
    { name: "Tools", goto: "/tools", icon: <SupportAgentIcon /> },
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
  function handleNotificationClick() {}
  function handleHelpCenterClick() {}
  const accountOpen = Boolean(accountOpenAnchor);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <AppBar
        component="nav"
        sx={{
          background: "var(--white)",
          color: "var(--accent)",
          boxShadow: "0px 2px 5px #5551",
        }}
        elevation={1}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ my: 1 }}>
            <Image
              src={Logo}
              alt="Scrape fox"
              width={180}
              height={180 / 4.05172414}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
          </Box>
          <Box>
            <SearchBar />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { sm: 1 },
              alignItems: "center",
            }}
          >
            <Tooltip title="Help Center">
              <IconButton onClick={handleHelpCenterClick}>
                <HelpIcon sx={{ color: "var(--accentlight)" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationClick}>
                <Badge badgeContent={17} variant="dot" color="error">
                  <NotificationsRoundedIcon
                    sx={{ color: "var(--accentlight)" }}
                  />
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
              sx={{ ml: 0.5, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavDrawer
            navLinks={navLinks}
            handleDrawerToggle={handleDrawerToggle}
          />
        </SwipeableDrawer>
      </Box>
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
            // "&:before": {
            //   content: '""',
            //   display: "block",
            //   position: "absolute",
            //   top: 0,
            //   right: 14,
            //   width: 10,
            //   height: 10,
            //   bgcolor: "background.paper",
            //   transform: "translateY(-50%) rotate(45deg)",
            //   zIndex: 0,
            // },
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
