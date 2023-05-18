import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Leads } from "@/shared/functions/createRandomLead";
export default function LeadsListItem({ lead }: { lead: Leads }) {
  return (
    <Stack direction="row">
      <Avatar alt="Lead Avatar" src={lead.avatar} />
      <Stack>
        <Typography> {`${lead.firstName} ${lead.lastName}`}</Typography>
        <Stack direction="row">
          <FacebookIcon />
          <LinkedInIcon /> <InstagramIcon />
        </Stack>
      </Stack>
    </Stack>
  );
}
