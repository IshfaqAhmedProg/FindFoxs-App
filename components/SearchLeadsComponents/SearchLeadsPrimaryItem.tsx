import React, { useState } from "react";
import {
  Avatar,
  Stack,
  IconButton,
  Typography,
  Menu,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/public/Icons/CustomIcons";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Lead } from "@/shared/interfaces/Lead";
import TableCell from "@/components/TableComponents/TableCell";

import SingleLeadCard from "./SingleLeadCard";
import Image from "next/image";

export default function SearchLeadsPrimaryItem({ content }: { content: Lead }) {
  const [seeMoreOpenAnchor, setSeeMoreOpenAnchor] =
    useState<null | HTMLElement>(null);
  const seeMoreOpen = Boolean(seeMoreOpenAnchor);
  const SocialButtons = styled(IconButton)({
    width: 19,
    height: 19,
  });
  const iconStyle = {
    width: 16,
    height: 16,
    color: "var(--graylight)",
    "& .MuiSvgIcon-root": {
      color: "var(--graylight)",
    },
  };
  const SeeMoreButton = {
    height: "100%",
    borderRadius: "var(--border-radius-small) 0 0 var(--border-radius-small)",
  };
  function handleSeeMoreClick(event: React.MouseEvent<HTMLElement>) {
    setSeeMoreOpenAnchor(event.currentTarget);
  }

  function handleClose() {
    setSeeMoreOpenAnchor(null);
  }
  return (
    <Stack
      direction="row"
      gap={0.5}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={"100%"}
    >
      <Avatar sx={{ width: "40px", height: "40px" }}>
        <Image alt="Lead Avatar" src={content.avatar} width={40} height={40} />
      </Avatar>
      <Stack direction="row" gap={0.5} alignItems={"center"}>
        <Stack gap={1}>
          <TableCell fixedWidth="15ch">
            <Tooltip title={content.name}>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  maxWidth: "100%",
                }}
                onClick={handleSeeMoreClick}
              >
                <Typography
                  noWrap
                  sx={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "var(--primarylight)",
                  }}
                >{`${content.name}`}</Typography>
              </button>
            </Tooltip>
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
          </TableCell>
        </Stack>
      </Stack>
      <IconButton
        sx={SeeMoreButton}
        onClick={handleSeeMoreClick}
        aria-controls={seeMoreOpen ? content.name : undefined}
        aria-haspopup="true"
        aria-expanded={seeMoreOpen ? "true" : undefined}
      >
        <ChevronRightRoundedIcon
          sx={{ fontSize: "25px", color: "var(--graylight)" }}
        />
      </IconButton>
      <Menu
        anchorEl={seeMoreOpenAnchor}
        id="backdropBlur"
        open={seeMoreOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <SingleLeadCard content={content} handleClose={handleClose} />
      </Menu>
    </Stack>
  );
}
