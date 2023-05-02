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
  Stack,
  MenuList,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import HelpIcon from "@mui/icons-material/HelpOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import { NavLinks } from "@/shared/interfaces/Links";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import NavMenu from "./NavMenu";
import { DashboardIcon } from "@/public/Icons/CustomIcons";

export default function UserControls({ container }: { container: any }) {
  const router = useRouter();
  const { logout } = useAuth();
  const [accountOpenAnchor, setAccountOpenAnchor] =
    useState<null | HTMLElement>(null);
  const accountOpen = Boolean(accountOpenAnchor);
  const navLinks: Array<NavLinks> = [
    {
      name: "Help Center",
      goto: "/help",
      handler: handleHelpCenterClick,
      icon: <HelpIcon />,
    },
    {
      name: "Notifications",
      goto: "",
      handler: handleNotificationClick,
      icon: (
        <>
          <Badge badgeContent={17} variant="dot" color="secondary"></Badge>
          <NotificationsIcon />
        </>
      ),
    },
    {
      name: "Account Settings",
      goto: "",
      handler: handleAccountClick,
      icon: <Avatar {...stringAvatar("Ishfaq Ahmed")} />,
    },
  ];
  const menuLinks: Array<NavLinks> = [
    {
      name: "Settings",
      handler: handleClose,
      icon: <SettingsOutlinedIcon />,
      goto: "/settings",
    },
    {
      name: "Dashboard",
      icon: <DashboardIcon color="var(--graylight)" />,
      goto: "/dashboard",
      handler: (param: any) => router.push("/dashboard"),
    },
    {
      name: "Logout",
      handler: handleLogout,
      icon: <LogoutRoundedIcon />,
      goto: "",
    },
  ];

  const accountHeader = (
    <>
      <Avatar {...stringAvatar("Ishfaq Ahmed")} />
      <Stack>
        <p style={{ fontWeight: "bold", color: "var(--primarydark)" }}>
          Ishfaq Ahmed
        </p>
        <p style={{ color: "var(--primarydark)", fontSize: "11px" }}>
          Team Manager
        </p>
      </Stack>
    </>
  );
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
  return (
    <>
      <Stack
        direction="row"
        sx={{
          gap: { sm: 0.5, md: 1 },
        }}
        alignItems="center"
      >
        {navLinks.map((navItem) => {
          return (
            <Tooltip title={navItem.name} key={navItem.name}>
              <IconButton
                onClick={navItem.handler}
                size="small"
                aria-controls={accountOpen ? navItem.name : undefined}
                aria-haspopup="true"
                aria-expanded={accountOpen ? "true" : undefined}
              >
                {navItem.icon}
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
      <NavMenu
        accountOpenAnchor={accountOpenAnchor}
        id="account-menu"
        handleClose={handleClose}
        accountOpen={accountOpen}
        items={menuLinks}
        header={accountHeader}
      />
    </>
  );
}
