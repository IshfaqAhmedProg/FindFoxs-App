import React from "react";
import {
  Avatar,
  Stack,
  IconButton,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { styled } from "@mui/material";
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/public/Icons/CustomIcons";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import { Leads } from "@/shared/interfaces/Leads";
import { TableCell } from "./TableContainer";
export default function TablePrimaryItem({ content }: { content: Leads }) {
  const SocialButtons = styled(IconButton)({
    width: 19,
    height: 19,
  });
  const iconStyle = {
    width: 16,
    height: 16,
    color: "var(--graylight)",
  };
  return (
    <Stack height="70px" justifyContent="space-between">
      <Stack direction="row" alignItems="center" gap={2}>
        <CustomCheckbox />
        <Avatar alt="Lead Avatar" src={content.avatar} />
        <Stack gap={1}>
          <TableCell>
            <Typography
              noWrap
              sx={{
                fontSize: 16,
                fontWeight: "700",
                color: "var(--primarylight)",
              }}
            >{`${content.name}`}</Typography>
          </TableCell>
          <Stack direction="row" gap={0.5}>
            <SocialButtons>
              <FacebookIcon sx={iconStyle} />
            </SocialButtons>
            <SocialButtons>
              <LinkedInIcon sx={iconStyle} />
            </SocialButtons>
            <SocialButtons>
              <InstagramIcon sx={iconStyle} />
            </SocialButtons>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ ml: 12 }} />
    </Stack>
  );
}
