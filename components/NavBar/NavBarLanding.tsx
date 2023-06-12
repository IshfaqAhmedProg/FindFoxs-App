"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AppBar,
  Box,
  SwipeableDrawer,
  Toolbar,
  Tooltip,
  Stack,
} from "@mui/material";

import { NavLinks } from "@/shared/interfaces/Links";
import { SearchBar } from "./SearchBar";
import { NavDrawer } from "./NavDrawer";
import UserControls from "./UserControls";
import HideOnScroll from "../HideOnScroll/HideOnScroll";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "../../public/Logos/ScrapeFoxLogo.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
interface Props {
  window?: () => Window;
}
export default function NavBarLanding(props: Props) {
  const { window } = props;
  const { user } = useAuth();
  const pagesLinks: Array<NavLinks> = [
    { name: "Features", goto: "/features" },
    { name: "Pricing", goto: "/pricing" },
    { name: "About", goto: "/about" },
  ];
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const loginSignupBox = (
    <Box
      sx={{
        display: { md: "flex", xs: "none" },
        alignItems: "center",
        gap: { sm: 0.5, md: 1 },
      }}
    >
      <Link href="/auth/signup" style={{ fontWeight: "bold" }}>
        Signup
      </Link>
      <Link href="/auth/login">
        <Tooltip title="Login">
          <LoginRoundedIcon />
        </Tooltip>
      </Link>
    </Box>
  );
  const landingLinks = (
    <Stack
      direction="row"
      spacing={3}
      fontWeight="bold"
      sx={{ display: { md: "flex", xs: "none" }, alignItems: "center" }}
    >
      {pagesLinks.map((link) => {
        return (
          <Link key={link.name} href={link.goto}>
            {link.name}
          </Link>
        );
      })}
    </Stack>
  );
  return (
    <AppBar
      component="nav"
      sx={{
        background:
          "linear-gradient(180deg, #E3EAFF 0%, rgba(255, 255, 255, 0) 100%)",
        boxShadow: "none",
      }}
      elevation={1}
    >
      <HideOnScroll>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "5vh",
            paddingInline: "5%",
          }}
          disableGutters
        >
          <Box
            sx={{
              width: { xs: "120px", sm: "181px" },
              minHeight: "36px",
              height: "auto",
              position: "relative",
            }}
          >
            <Link href={"/"}>
              <Image
                src={Logo}
                alt="Scrape fox"
                fill
                style={{
                  cursor: "pointer",
                  maxWidth: "181px",
                  objectFit: "contain",
                }}
              />
            </Link>
          </Box>
          {landingLinks}
          {user ? <UserControls container={container} /> : loginSignupBox}
        </Toolbar>
      </HideOnScroll>
    </AppBar>
  );
}
