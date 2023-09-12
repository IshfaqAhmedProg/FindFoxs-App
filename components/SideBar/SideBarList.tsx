import { SideBarLinks } from "@/shared/interfaces/Links";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
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
      <Tooltip
        title={toggle && content.name}
        placement="right"
        enterDelay={500}
      >
        <ListItemButton
          sx={{ gap: "0.8rem", paddingRight: "10px" }}
          selected={router.pathname === content.goto}
          onClick={() => handleSideBarListClick(content)}
        >
          {content.icon}
          <ListItemText
            disableTypography
            primary={
              <Typography variant="h5" fontSize={"0.9rem"}>
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
      {content.children && (
        <Collapse in={content.expanded} timeout="auto" unmountOnExit>
          <List disablePadding>
            {Object.keys(content.children).map((child) => {
              if (content.children)
                return (
                  <SideBarListChild
                    key={child}
                    child={content.children[child]}
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
