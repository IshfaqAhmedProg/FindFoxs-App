import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  SwipeableDrawer,
  SvgIconProps,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import InfoIcon from "@mui/icons-material/InfoRounded";
import ContactMailIcon from "@mui/icons-material/ContactMailRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgentRounded";
import { NavDrawer } from "./NavDrawer";
import Image from "next/image";
import Logo from "../../public/Logos/VerifyFoxLogo.svg";
import Link from "next/link";
import { stringAvatar } from "@/shared/functions/stringAvatar";
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
  const navLinks: Array<NavLinks> = [
    { name: "Dashboard", goto: "/", icon: <HomeIcon /> },
    { name: "About", goto: "/about", icon: <InfoIcon /> },
    { name: "Contact", goto: "/contact", icon: <ContactMailIcon /> },
    { name: "Support", goto: "/support", icon: <SupportAgentIcon /> },
  ];
  function handleDrawerToggle() {
    setDrawerToggle((prev) => !prev);
  }

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
            />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              gap: { sm: 2 },
              alignItems: "center",
            }}
          >
            {navLinks.map((item) => (
              <Link href={item.goto} key={item.name}>
                {item.name}
              </Link>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { sm: 2 },
              alignItems: "center",
            }}
          >
            <Avatar {...stringAvatar("Ishfaq Ahmed")} />
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
    </>
  );
}
