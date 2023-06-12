import { SimpleLink } from "@/shared/interfaces/Links";
import React from "react";
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
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { useRouter, usePathname } from "next/navigation";
export default function SideBarListChild({
  toggle,
  child,
}: {
  toggle: boolean;
  child: SimpleLink;
}) {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <Tooltip title={child.name}>
      <ListItemButton
        key={child.name}
        sx={{ marginLeft: "3rem", gap: "1rem", paddingRight: "15px" }}
        selected={pathName === child.goto}
        onClick={() => router.push(child.goto)}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography
              color={"var(--primary)"}
              sx={{
                fontSize: "14px",
              }}
              maxWidth="18ch"
            >
              {child.name}
            </Typography>
          }
        />
        {toggle && <FiberManualRecordIcon sx={{ fontSize: "15px" }} />}
      </ListItemButton>
    </Tooltip>
  );
}
