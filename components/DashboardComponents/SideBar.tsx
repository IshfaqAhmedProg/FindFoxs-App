import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import React from "react";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import {
  DashboardIcon,
  LeadsIcon,
  ToolsIcon,
} from "@/public/Icons/CustomIcons";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { SideBarLinks, SimpleLink } from "@/shared/interfaces/Links";
import { useRouter } from "next/router";
interface Props {
  toggle: boolean;
  handleToggle: (params: boolean) => void;
}
export default function SideBar({ toggle, handleToggle }: Props) {
  const sidebarWidth = 300;
  const router = useRouter();
  const sidebarContent: Array<SideBarLinks> = [
    {
      name: "Dashboard",
      icon: <DashboardIcon color="var(--accent)" />,
      goto: "/dashboard",
    },
    {
      name: "Leads",
      icon: <LeadsIcon color="var(--accent)" />,
      goto: "",
      children: [
        { name: "Search Leads", goto: "/" },
        { name: "Manage Your Leads", goto: "/" },
        { name: "Engage with Leads", goto: "/" },
      ],
    },
    {
      name: "Tools",
      icon: <ToolsIcon color="var(--accent)" />,
      goto: "",
      children: [
        { name: "Email Validator", goto: "/" },
        { name: "Number Validator", goto: "/" },
        { name: "WhatsApp Validator", goto: "/" },
        { name: "Google Maps Scraper", goto: "/" },
        { name: "Email and Contacts Scraper", goto: "/" },
      ],
    },
    {
      name: "Tasks",
      icon: <TaskOutlinedIcon sx={{ color: "var(--accent)" }} />,
      goto: "/",
    },
    {
      name: "Settings",
      icon: <SettingsOutlinedIcon sx={{ color: "var(--accent)" }} />,
      goto: "/",
    },
  ];
  const SidebarList = ({ content }: { content: SideBarLinks }) => {
    return (
      <>
        <ListItemButton
          sx={{ gap: "1rem" }}
          selected={router.pathname === content.goto}
        >
          {content.icon}
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "var(--primarydark)",
            }}
          >
            {content.name}
          </Typography>
        </ListItemButton>
        {content.children?.length != 0 && (
          <List disablePadding>
            {content.children?.map((child) => {
              return <ChildList key={child.name} child={child} />;
            })}
          </List>
        )}
      </>
    );
  };
  const ChildList = ({ child }: { child: SimpleLink }) => {
    return (
      <ListItemButton
        key={child.name}
        sx={{ marginLeft: "3rem" }}
        selected={router.pathname === child.goto}
      >
        <Typography
          color={"var(--primary)"}
          sx={{
            fontSize: "14px",
          }}
          maxWidth="18ch"
        >
          {child.name}
        </Typography>
      </ListItemButton>
    );
  };
  return (
    <Box
      maxWidth={sidebarWidth}
      minWidth={sidebarWidth}
      top={0}
      position={toggle ? "absolute" : "relative"}
      left={toggle ? 50 - sidebarWidth : 0}
      height="100%"
      sx={{
        boxShadow: "var(--box-shadow)",
        transition: "left 0.15s ease",
      }}
      bgcolor="white"
      paddingTop="4.375rem"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <IconButton
        onClick={() => handleToggle(!toggle)}
        sx={{
          transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.15s ease",
        }}
      >
        <MenuOpenRoundedIcon />
      </IconButton>
      <List sx={{ width: "100%" }}>
        {sidebarContent.map((content) => {
          return <SidebarList key={content.name} content={content} />;
        })}
      </List>
    </Box>
  );
}