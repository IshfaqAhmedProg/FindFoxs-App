import { SimpleLink } from "@/shared/interfaces/Links";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import { useRouter } from "next/router";
export default function SideBarListChild({
  toggle,
  child,
}: {
  toggle: boolean;
  child: SimpleLink;
}) {
  const router = useRouter();

  return (
    <Tooltip title={child.name} placement="right" enterDelay={500}>
      <ListItemButton
        key={child.name}
        sx={{ marginLeft: "2.5rem", paddingRight: "15px" }}
        selected={router.pathname === child.goto}
        onClick={() => router.push(child.goto)}
      >
        <ListItemText
          disableTypography
          primary={
            <Typography
              color={"var(--primary)"}
              sx={{
                fontSize: "13px",
              }}
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
