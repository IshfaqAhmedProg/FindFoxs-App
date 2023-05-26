import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import { SideBarLinks } from "@/shared/interfaces/Links";
import React from "react";
import { useRouter } from "next/router";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import SideBarListChild from "./SideBarListChild";
export default function SidebarList({
  toggle,
  content,
  handleSideBarListClick,
}: {
  toggle: boolean;
  content: SideBarLinks;
  handleSideBarListClick: (param: SideBarLinks) => void;
}) {
  const router = useRouter();
  const expandIconStyles = {
    ":hover": {
      color: "var(--accent)",
    },
  };
  return (
    <>
      <Tooltip title={toggle && content.name}>
        <ListItemButton
          sx={{ gap: "1rem", paddingRight: "10px" }}
          selected={router.pathname === content.goto}
          onClick={() => handleSideBarListClick(content)}
        >
          {content.icon}
          <ListItemText
            disableTypography
            primary={
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "var(--primarydark)",
                }}
              >
                {content.name}
              </Typography>
            }
          />
          {toggle && content.icon}
          {!toggle && content.children ? (
            content.expanded ? (
              <ExpandLessRoundedIcon sx={expandIconStyles} />
            ) : (
              <ExpandMoreRoundedIcon sx={expandIconStyles} />
            )
          ) : (
            ""
          )}
        </ListItemButton>
      </Tooltip>
      {content.children?.length != 0 && (
        <Collapse in={content.expanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {content.children?.map((child) => {
              return (
                <SideBarListChild
                  key={child.name}
                  child={child}
                  toggle={toggle}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}
