import { Box } from "@mui/material";
import React, { useState } from "react";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery, Typography } from "@mui/material";

export default function DashboardLayout({
  title,
  children,
}: {
  title?: string;
  children: React.ReactElement;
}) {
  const theme = useTheme();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(
    //to keep the sidebar toggled when screen is big
    useMediaQuery(theme.breakpoints.down("md"))
  );
  return (
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
        paddingLeft={toggleSidebar ? "4rem" : "1rem"}
        paddingBottom={1}
        paddingRight={1}
        alignItems="flex-start"
      >
        <Typography variant="h4" component="h1" px={1.5}>
          {title}
        </Typography>
        <Box
          width="100%"
          height="100%"
          display="grid"
          sx={{
            overflowY: "auto",
            overflowX: "visible",
            gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
            gridAutoRows: "auto",
          }}
          pt={1}
          px={1.5}
          gap={2}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
