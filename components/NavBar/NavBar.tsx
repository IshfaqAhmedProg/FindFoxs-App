import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AppBar, Box, Toolbar, Tooltip, Stack } from "@mui/material";

import { NavLinks } from "@/shared/interfaces/Links";
import UserControls from "./UserControls";
import HideOnScroll from "../CustomComponents/HideOnScroll/HideOnScroll";

import { useAuth } from "@/contexts/AuthContext";

import Logo from "../../public/Logos/ScrapeFoxLogo.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import RouteChangeIndicator from "./RouteChangeIndicator";
interface Props {
  window?: () => Window;
}

export default function NavBar(props: Props) {
  const { window } = props;
  const { user } = useAuth();
  const router = useRouter();
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
      {router.pathname != "/auth/signup" && (
        <Link href="/auth/signup" style={{ fontWeight: "bold" }}>
          Signup
        </Link>
      )}
      {router.pathname != "/auth/login" && (
        <Link href="/auth/login">
          <Tooltip title="Login">
            <LoginRoundedIcon />
          </Tooltip>
        </Link>
      )}
      {/* <SearchBar /> */}
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
      sx={
        router.pathname != "/"
          ? {
              background: "var(--white)",
              color: "var(--primary)",
              boxShadow: "var(--box-shadow)",
            }
          : {
              background:
                "linear-gradient(180deg, #E3EAFF 0%,#f0f4ff99 70%, rgba(255, 255, 255, 0) 100%)",
              boxShadow: "none",
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
                  paddingInline: "5%",
                }
              : {
                  display: "flex",
                  justifyContent: "space-between",
                  paddingInline: "5%",
                }
          }
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
          <Stack direction={"row"} gap={3}>
            {router.pathname == "/" && landingLinks}
            {user ? <UserControls container={container} /> : loginSignupBox}
          </Stack>
        </Toolbar>
      </HideOnScroll>
      <RouteChangeIndicator />
    </AppBar>
  );
}
