import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Cursor from "../LandingComponents/Cursor";
import styles from "@/styles/Home.module.css";

export default function DashboardLayout({
  children,
}: {
  children?:
    | React.ReactElement
    | JSX.Element
    | Array<React.ReactElement | JSX.Element>;
}) {
  const theme = useTheme();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(
    //to keep the sidebar toggled when screen is big
    useMediaQuery(theme.breakpoints.down("md"))
  );
  const router = useRouter();
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
          sx={
            toggleSidebar
              ? {
                  paddingTop: { xs: "4rem", md: "4.5rem" },
                  paddingLeft: { xs: "2.5rem", md: "3.5rem" },
                  paddingRight: { xs: "0", md: "1" },
                }
              : {
                  paddingTop: { xs: "4rem", md: "4.5rem" },
                  paddingRight: { xs: "0", md: "1" },
                }
          }
          paddingBottom={1}
          alignItems="flex-start"
        >
          <Box
            width="100%"
            height="100%"
            display="grid"
            sx={
              router.pathname == "/dashboard"
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
