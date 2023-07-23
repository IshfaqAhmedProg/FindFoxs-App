import { Box, IconButton, List } from "@mui/material";
import React, { useState } from "react";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import {
  DashboardIcon,
  LeadsIcon,
  ToolsIcon,
} from "@/public/Icons/CustomIcons";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { SideBarLinks } from "@/shared/interfaces/Links";
import { useRouter } from "next/router";
import SidebarList from "./SideBarList";
import CustomButton from "../CustomComponents/CustomButton";
import mainRoutes from "@/routes/mainRoutes";
interface Props {
  toggle: boolean;
  handleToggle: (params: boolean) => void;
}
export default function SideBar({ toggle, handleToggle }: Props) {
  const sidebarWidth = 300;
  const router = useRouter();
  const [leadsToggle, setLeadsToggle] = useState(true);
  const [toolsToggle, setToolsToggle] = useState(true);

  const sidebarContent: Array<SideBarLinks> = [
    {
      ...mainRoutes.dashboard,
      icon: <DashboardIcon />,
    },
    {
      ...mainRoutes.leads,
      icon: <LeadsIcon />,
      expanded: leadsToggle,
    },
    {
      ...mainRoutes.tools,

      icon: <ToolsIcon />,
      expanded: toolsToggle,
    },
    {
      ...mainRoutes.tasks,
      icon: <TaskOutlinedIcon />,
    },
    {
      ...mainRoutes.settings,
      icon: <SettingsOutlinedIcon />,
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
        overflowY: "auto",
      }}
      bgcolor="white"
      paddingTop="4.375rem"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <CustomButton
        kind="icon"
        iconButtonProps={{
          onClick: () => handleToggle(!toggle),
          sx: {
            transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
          },
        }}
      >
        <MenuOpenRoundedIcon />
      </CustomButton>
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
