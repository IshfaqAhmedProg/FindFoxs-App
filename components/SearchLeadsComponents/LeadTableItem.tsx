import React from "react";
import TableCell from "../TableComponents/TableCell";
import Link from "next/link";
import { Lead } from "@/shared/interfaces/Lead";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

export default function LeadTableItem({ content }: { content: Lead }) {
  const linkStyle = {
    color: "var(--primarylight)",
    fontSize: "14px",
  };
  return (
    <>
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
    </>
  );
}
