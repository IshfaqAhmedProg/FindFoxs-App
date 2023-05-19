import React from "react";
import { Stack, Divider, IconButton } from "@mui/material";
import { TableCell } from "./TableContainer";
import Link from "next/link";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import PhoneLockedOutlinedIcon from "@mui/icons-material/PhoneLockedOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Leads } from "@/shared/interfaces/Leads";

const LeadControls = ({ content }: { content: Leads }) => {
  return (
    <Stack direction="row" gap={2}>
      <IconButton>
        <MailLockOutlinedIcon />
      </IconButton>
      <IconButton>
        <PhoneLockedOutlinedIcon />
      </IconButton>
      <IconButton>
        <MoreHorizIcon />
      </IconButton>
    </Stack>
  );
};

export default function TableItem({ content }: { content: Leads }) {
  const linkStyle = {
    color: "var(--primarylight)",
    fontSize: "14px",
  };
  return (
    <Stack height="70px" justifyContent="space-between" width="100%">
      <Stack direction="row" alignItems="center" gap={2} pl={2} mt={2}>
        <TableCell>{content.jobTitle}</TableCell>
        <TableCell>
          <Link
            href={content.companyWebsite}
            style={linkStyle}
            target="_blank"
            passHref={true}
          >
            <InsertLinkIcon sx={{ fontSize: "15px", mt: 1 }} />
            {content.companyName}
          </Link>
        </TableCell>
        <TableCell>{content.location}</TableCell>
        <TableCell>{content.industry}</TableCell>
        <TableCell>
          <LeadControls content={content} />
        </TableCell>
      </Stack>
      <Divider />
    </Stack>
  );
}
