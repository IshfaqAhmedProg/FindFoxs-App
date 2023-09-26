import mainRoutes from "@/routes/mainRoutes";
import { SideBarLinks } from "@/shared/interfaces/Links";
import Diversity1RoundedIcon from "@mui/icons-material/Diversity1Rounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import TaskRoundedIcon from "@mui/icons-material/TaskRounded";
import { Box, List } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import CustomIconButton from "../CustomComponents/CustomIconButton";
import SidebarList from "./SideBarList";

interface Props {
  toggle: boolean;
  handleToggle: (params: boolean) => void;
}
export default function SideBar({ toggle, handleToggle }: Props) {
  const sidebarWidth = 280;
  const router = useRouter();
  const sidebarContent: Array<SideBarLinks> = [
    {
      ...mainRoutes.dashboard,
      icon: <SpeedRoundedIcon />,
    },
    {
      ...mainRoutes.crm,
      icon: <Diversity1RoundedIcon />,
      expanded: true,
    },
    {
      ...mainRoutes.people,
      icon: <Groups2RoundedIcon />,
      expanded: true,
    },
    {
      ...mainRoutes.tools,

      icon: <HandymanOutlinedIcon />,
      expanded: true,
    },
    {
      ...mainRoutes.tasks,
      icon: <TaskRoundedIcon />,
    },
    {
      ...mainRoutes.settings,
      icon: <SettingsRoundedIcon />,
    },
  ];
  const [contentState, setContentState] = useState(sidebarContent);

  function handleSideBarListClick(clickedContent: SideBarLinks) {
    if (!!clickedContent.goto) {
      router.push(clickedContent.goto);
    }
    console.log("clickedContent", clickedContent);
    setContentState((prev) =>
      prev.map((content) => {
        if (content.name == clickedContent.name) {
          content["expanded"] = !content.expanded;
          console.log("content", content);
          return content;
        } else return content;
      })
    );
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
      bgcolor="var(--white)"
      paddingTop="4.375rem"
      display="flex"
      flexDirection="column"
      alignItems="flex-end"
    >
      <CustomIconButton
        onClick={() => handleToggle(!toggle)}
        sx={{
          transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.15s ease",
          "& .MuiSvgIcon-root": {
            color: "var(--graylight)",
          },
        }}
      >
        <MenuOpenRoundedIcon />
      </CustomIconButton>
      <List sx={{ width: "100%" }}>
        {contentState.map((content) => {
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
