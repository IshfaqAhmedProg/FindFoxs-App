import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  AppBar,
  Box,
  Slide,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  useScrollTrigger,
  Stack,
} from "@mui/material";

import { NavLinks } from "@/shared/interfaces/NavLinks";
import { SearchBar } from "./SearchBar";
import { NavDrawer } from "./NavDrawer";
import UserControls from "./UserControls";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "../../public/Logos/ScrapeFoxLogo.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
interface Props {
  window?: () => Window;
  children: React.ReactElement;
}
function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
export default function NavBar(props: Props) {
  const { window } = props;
  const { user } = useAuth();
  const router = useRouter();
  const [drawerToggle, setDrawerToggle] = useState(false);
  const drawerWidth = 240;
  const drawerItems: Array<NavLinks> = [
    { name: "Login", goto: "/auth/login" },
    { name: "Signup", goto: "/auth/signup" },
  ];
  function handleDrawerToggle() {
    setDrawerToggle((prev) => !prev);
  }
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const loginSignupBox = (
    <Box
      gap="1.5rem"
      sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
    >
      {router.pathname != "/auth/signup" && (
        <Link href="/auth/signup" style={{ fontWeight: "bold" }}>
          Signup
        </Link>
      )}
      {router.pathname != "/auth/login" && (
        <Tooltip title="Login">
          <Link href="/auth/login">
            <LoginRoundedIcon sx={{ color: "var(--accent)" }} />
          </Link>
        </Tooltip>
      )}
      <SearchBar />
    </Box>
  );
  const landingLinks = (
    <Stack
      direction="row"
      spacing={3}
      fontWeight="bold"
      sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
    >
      <Link href="/features">Features</Link>
      <Link href="/pricing">Pricing</Link>
      <Link href="/about">About</Link>
    </Stack>
  );
  return (
    <AppBar
      component="nav"
      sx={
        router.pathname != "/"
          ? {
              background: "var(--white)",
              color: "var(--primary)",
              boxShadow: "var(--box-shadow)",
            }
          : {
              background:
                "linear-gradient(180deg, #E3EAFF 0%, rgba(255, 255, 255, 0) 100%)",
              boxShadow: "none",
              paddingBottom: "1.5rem",
            }
      }
      elevation={1}
    >
      <HideOnScroll>
        <Toolbar
          sx={
            router.pathname == "/"
              ? {
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "5vh",
                  paddingInline: "7vw",
                }
              : {
                  display: "flex",
                  justifyContent: "space-between",
                }
          }
          disableGutters
        >
          <Box
            sx={{
              width: "181px",
              minHeight: "36px",
              height: "auto",
              position: "relative",
            }}
          >
            <Image
              src={Logo}
              alt="Scrape fox"
              fill
              onClick={() => router.push("/")}
              style={{
                cursor: "pointer",
                maxWidth: "181px",
                objectFit: "contain",
              }}
            />
          </Box>
          {router.pathname == "/" && landingLinks}
          {user ? <UserControls container={container} /> : loginSignupBox}
        </Toolbar>
      </HideOnScroll>

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
          drawerItems={drawerItems}
          handleDrawerToggle={handleDrawerToggle}
        />
      </SwipeableDrawer>
    </AppBar>
  );
}
