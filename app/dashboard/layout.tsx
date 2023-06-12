"use client";
import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "@/components/SideBar/SideBar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import styles from "@/styles/Home.module.css";
import Cursor from "@/components/LandingComponents/Cursor";

export default function DashboardLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(
    //to keep the sidebar toggled when screen is big
    useMediaQuery(theme.breakpoints.down("md"))
  );
  const pathName = usePathname();
  return (
    <main className={styles.dashboard}>
      <Cursor />
      <Box position="relative" height="100%" width="100%" display="flex">
        <SideBar
          toggle={toggleSidebar}
          handleToggle={(toggle) => setToggleSidebar(toggle)}
        />
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          height="100%"
          paddingTop="5.5rem"
          sx={
            toggleSidebar
              ? {
                  paddingLeft: { xs: "3rem", md: "4rem" },
                  paddingRight: { xs: "0", md: "1" },
                }
              : {
                  paddingLeft: { xs: "0.5rem", md: "1rem" },
                  paddingRight: { xs: "0", md: "1" },
                }
          }
          paddingBottom={1}
          alignItems="flex-start"
        >
          <Typography variant="h4" component="h1" px={1.5}>
            {title}
          </Typography>
          <Box
            width="100%"
            height="100%"
            display="grid"
            sx={
              pathName == "/dashboard"
                ? {
                    overflowY: "auto",
                    overflowX: "visible",
                    gridTemplateColumns: { md: "1fr", lg: "1fr 1fr" },
                    gridAutoRows: "auto",
                    px: { xs: 0, md: 1.5 },
                  }
                : {
                    overflowY: "auto",
                    overflowX: "visible",
                    px: { xs: 0, md: 1.5 },
                  }
            }
            pt={1}
            gap={2}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </main>
  );
}
