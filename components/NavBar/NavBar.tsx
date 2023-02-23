import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import Image from "next/image";
import Logo from "../../public/Logos/ScrapeFoxLogo.svg";
import { SearchBar } from "./SearchBar";
import { useRouter } from "next/router";
import UserControls from "./UserControls";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
interface Props {
  window?: () => Window;
}
export default function NavBar(props: Props) {
  const { window } = props;
  const { user } = useAuth();
  const router = useRouter();

  const container =
    window !== undefined ? () => window().document.body : undefined;
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
              background: "transparent",

              boxShadow: "none",
            }
      }
      elevation={1}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ ml: 3 }}>
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
        {user ? (
          <UserControls container={container} />
        ) : (
          <Box display="flex" gap="1.5rem">
            {router.pathname != "/auth/login" && (
              <Link href="/auth/login">Login</Link>
            )}
            {router.pathname != "/auth/signup" && (
              <Link href="/auth/signup" style={{ fontWeight: "bold" }}>
                Signup
              </Link>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
