import React from "react";
import { Stack, Divider } from "@mui/material";
import { TableCell } from "./TableContainer";
import Link from "next/link";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import { Lead } from "@/shared/interfaces/Lead";

export default function TableItem({ content }: { content: Lead }) {
  const linkStyle = {
    color: "var(--primarylight)",
    fontSize: "14px",
  };
  return (
    <Stack
      height="81px"
      justifyContent="space-between"
      width="100%"
      pt={2}
      gap={2}
    >
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
      </Stack>
      <Divider />
    </Stack>
  );
}
