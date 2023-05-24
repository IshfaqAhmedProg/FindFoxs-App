import React, { useState } from "react";
import {
  Divider,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Tooltip,
} from "@mui/material";
import CustomButton from "../CustomUIComponents/CustomButton";
import { Lead, LeadAction } from "@/shared/interfaces/Lead";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
export default function SearchLeadsSelectAction() {
  const color = { color: "var(--primarylight)" };
  const LeadTableSelectActions: Array<LeadAction> = [
    {
      title: "Save to Group",
      icon: <AddHomeOutlinedIcon sx={color} />,
      handler: (e) => handleSaveToGroup("group1", []),
    },
    {
      title: "Add to Stage",
      icon: <AddchartOutlinedIcon sx={color} />,
      handler: (e) => handleAddToStage("stage1", []),
    },
    {
      title: "Send Email",
      icon: <ForwardToInboxOutlinedIcon sx={color} />,
      handler: (e) => handleSendMail([]),
    },
    {
      title: "Make a Call",
      icon: <PhoneForwardedRoundedIcon sx={color} />,
      handler: (e) => handleMakeCall([]),
    },
    {
      title: "More",
      icon: <MoreVertOutlinedIcon sx={color} />,
      handler: (e) => handleSeeMoreClick(e),
    },
  ];
  const [seeMoreOpenAnchor, setSeeMoreOpenAnchor] =
    useState<null | HTMLElement>(null);
  const seeMoreOpen = Boolean(seeMoreOpenAnchor);
  function handleSaveToGroup(groupName: string, itemsToAdd: Array<Lead>) {}
  function handleAddToStage(stage: string, itemsToAdd: Array<Lead>) {}
  function handleSendMail(sendTo: Array<Lead>) {}
  function handleMakeCall(callTo: Array<Lead>) {}
  function handleSeeMoreClick(event: React.MouseEvent<HTMLElement>) {
    setSeeMoreOpenAnchor(event.currentTarget);
  }
  function handleClose() {
    setSeeMoreOpenAnchor(null);
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"flex-end"}
        width={"100%"}
        gap={1}
      >
        {LeadTableSelectActions.map((filter) => {
          return (
            <CustomButton
              kind="icon"
              key={filter.title}
              iconButtonProps={{ onClick: filter.handler }}
            >
              <Tooltip title={filter.title}>{filter.icon}</Tooltip>
            </CustomButton>
          );
        })}
      </Stack>
      <Menu
        anchorEl={seeMoreOpenAnchor}
        open={seeMoreOpen}
        id="seeMore"
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Do not recommend</MenuItem>
        <Divider />
        <MenuItem>Bookmark</MenuItem>
      </Menu>
    </>
  );
}
