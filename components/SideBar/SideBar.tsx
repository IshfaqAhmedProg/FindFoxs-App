import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
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
import SidebarList from "./SideBarList";

interface Props {
  toggle: boolean;
  handleToggle: (params: boolean) => void;
}
export default function SideBar({ toggle, handleToggle }: Props) {
  const sidebarWidth = 300;
  const router = useRouter();
  const [leadsToggle, setLeadsToggle] = useState(false);
  const [toolsToggle, setToolsToggle] = useState(false);

  const sidebarContent: Array<SideBarLinks> = [
    {
      name: "Dashboard",
      icon: <DashboardIcon />,
      goto: "/dashboard",
    },
    {
      name: "Leads",
      icon: <LeadsIcon />,
      goto: "",
      children: [
        { name: "Search Leads", goto: "/leads/search" },
        { name: "Manage Your Leads", goto: "/leads/manage" },
        { name: "Engage with Leads", goto: "/leads/engage" },
      ],
      expanded: leadsToggle,
    },
    {
      name: "Tools",
      icon: <ToolsIcon />,
      goto: "",
      children: [
        { name: "Email Validator", goto: "/" },
        { name: "Number Validator", goto: "/" },
        { name: "WhatsApp Validator", goto: "/" },
        { name: "Google Maps Scraper", goto: "/" },
        { name: "Email and Contacts Scraper", goto: "/" },
      ],
      expanded: toolsToggle,
    },
    {
      name: "Tasks",
      icon: <TaskOutlinedIcon />,
      goto: "/tasks",
    },
    {
      name: "Settings",
      icon: <SettingsOutlinedIcon />,
      goto: "/",
    },
  ];
  function handleSideBarListClick(content: SideBarLinks) {
    if (!!content.goto) {
      router.push(content.goto);
    }
    switch (content.name) {
      case "Leads":
        {
          setLeadsToggle(!content.expanded);
        }
        break;
      case "Tools":
        {
          setToolsToggle(!content.expanded);
        }
        break;

      default:
        break;
    }
  }

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
          return (
            <SidebarList
              key={content.name}
              content={content}
              toggle={toggle}
              handleSideBarListClick={handleSideBarListClick}
            />
          );
        })}
      </List>
    </Box>
  );
}
