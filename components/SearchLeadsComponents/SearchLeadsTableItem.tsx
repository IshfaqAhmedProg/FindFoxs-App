import React from "react";
import TableCell from "../TableComponents/TableCell";
import Link from "next/link";
import { Lead } from "@/shared/interfaces/Lead";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

export default function SearchLeadsTableItem({ content }: { content: Lead }) {
  const linkStyle = {
    color: "var(--primarylight)",
    fontSize: "14px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
  };
  return (
    <>
      <TableCell>{content.jobTitle}</TableCell>
      <TableCell>
        <Link
          href={content.companyWebsite}
          target="_blank"
          style={linkStyle}
          passHref={true}
        >
          <InsertLinkIcon sx={{ fontSize: "15px" }} />
          {content.companyName}
        </Link>
      </TableCell>
      <TableCell>{content.location}</TableCell>
      <TableCell>{content.industry}</TableCell>
    </>
  );
}
