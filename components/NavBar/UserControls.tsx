import { useAuth } from "@/contexts/AuthContext";
import { DashboardIcon } from "@/public/Icons/CustomIcons";
import { NavLinks } from "@/shared/interfaces/Links";
import HelpIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Badge, Stack, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import CustomButton from "../CustomComponents/CustomButton";
import CustomIconButton from "../CustomComponents/CustomIconButton";
import IdentityDisplay from "../CustomComponents/IdentityDisplay/IdentityDisplay";
import NavMenu from "./NavMenu";
import UserAvatar from "./UserAvatar";

export default function UserControls({ container }: { container: any }) {
  const router = useRouter();
  const { user, logout } = useAuth();
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
      icon: <NotificationsIcon />,
      badge: true,
    },
    {
      name: "Account Settings",
      goto: "",
      handler: handleAccountClick,
      icon: <UserAvatar avatar={user?.photoURL} name={user?.email} />,
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
      icon: <DashboardIcon />,
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

  function handleAccountClick(event: React.MouseEvent<HTMLElement>) {
    setAccountOpenAnchor(event.currentTarget);
  }

  function handleClose() {
    setAccountOpenAnchor(null);
  }
  function handleLogout() {
    logout();
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
          if (navItem.icon) {
            return (
              <CustomIconButton
                key={navItem.name}
                onClick={navItem.handler}
                size="small"
                aria-controls={accountOpen ? navItem.name : "undefined"}
                aria-haspopup={true}
                aria-expanded={accountOpen ? true : undefined}
              >
                <Tooltip title={navItem.name}>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={!navItem?.badge}
                  >
                    {navItem.icon}
                  </Badge>
                </Tooltip>
              </CustomIconButton>
            );
          }
        })}
      </Stack>
      <NavMenu
        accountOpenAnchor={accountOpenAnchor}
        id="account-menu"
        handleClose={handleClose}
        accountOpen={accountOpen}
        items={menuLinks}
        header={
          <IdentityDisplay
            avatar={user?.photoURL}
            name={user?.email}
            title="Team Manager"
            maxWidth="15ch"
          />
        }
      />
    </>
  );
}
