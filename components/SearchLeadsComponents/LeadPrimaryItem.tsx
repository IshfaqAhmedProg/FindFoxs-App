import React, { useState } from "react";
import {
  Avatar,
  Stack,
  IconButton,
  Typography,
  Menu,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material";
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/public/Icons/CustomIcons";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CustomCheckbox from "../CustomUIComponents/CustomCheckbox";
import { Lead } from "@/shared/interfaces/Lead";
import TableCell from "@/components/TableComponents/TableCell";

import SingleLeadCard from "../SearchLeadsComponents/SingleLeadCard";
import { useTable } from "@/contexts/TableContext";

export default function LeadPrimaryItem({ content }: { content: Lead }) {
  const { selected, handleSelect } = useTable();
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
    <Stack direction="row" alignItems="center" gap={2}>
      <CustomCheckbox
        checked={selected.includes(content._id)}
        onChange={(e, checked) => handleSelect(content._id)}
      />

      <Avatar alt="Lead Avatar" src={content.avatar} />
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
                onClick={(e) => handleSelect(content._id)}
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
      </Stack>
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
