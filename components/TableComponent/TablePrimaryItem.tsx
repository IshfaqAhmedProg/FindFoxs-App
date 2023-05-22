import React, { useState } from "react";
import {
  Avatar,
  Stack,
  IconButton,
  Typography,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
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
import { TableCell } from "./TableContainer";
import IdentityDisplay from "../CustomUIComponents/IdentityDisplay";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import CustomButton from "../CustomUIComponents/CustomButton";
import { CheckboxSelect, CheckboxSelected } from "@/pages/leads/search";

interface Props extends CheckboxSelect, CheckboxSelected {
  content: Lead;
}
export default function TablePrimaryItem({
  content,
  handleSelect,
  selected,
}: Props) {
  const [seeMoreOpenAnchor, setSeeMoreOpenAnchor] =
    useState<null | HTMLElement>(null);
  const seeMoreOpen = Boolean(seeMoreOpenAnchor);
  const iconColor = { color: "var(--graylight)" };

  const PrivateDetails = [
    {
      title: "Email",
      icon: <ApartmentRoundedIcon sx={iconColor} />,
      value: content.email,
    },
    {
      title: "Phone Number",
      icon: <PinDropRoundedIcon sx={iconColor} />,
      value: content.phoneNumber,
    },
  ];
  const CompanyDetails = [
    {
      title: "Company",
      icon: <ApartmentRoundedIcon sx={iconColor} />,
      value: content.companyName,
    },
    {
      title: "Location",
      icon: <PinDropRoundedIcon sx={iconColor} />,
      value: content.location,
    },
    {
      title: "Industry",
      icon: <FactoryRoundedIcon sx={iconColor} />,
      value: content.industry,
    },
  ];
  const SocialButtons = styled(IconButton)({
    width: 19,
    height: 19,
  });
  const SeeMoreButton = {
    height: "100%",
    borderRadius: "var(--border-radius-small) 0 0 var(--border-radius-small)",
  };
  const iconStyle = {
    width: 16,
    height: 16,
    color: "var(--graylight)",
  };
  function handleSeeMoreClick(event: React.MouseEvent<HTMLElement>) {
    setSeeMoreOpenAnchor(event.currentTarget);
  }

  function handleClose() {
    setSeeMoreOpenAnchor(null);
  }
  return (
    <>
      <Stack
        height="81px"
        justifyContent="space-between"
        pt={2}
        ml={1}
        gap={2}
        sx={
          selected.includes(content._id)
            ? {
                background: "var(--graylighter)",
                borderRadius: "var(--border-radius) 0 0 var(--border-radius) ",
                transition: "all 0.1s ease-in-out",
              }
            : {
                background: "transparent",
                borderRadius: 0,
                transition: "all 0.1s ease-in-out",
              }
        }
      >
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
        </Stack>
        <Divider sx={{ ml: 12 }} />
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
        <CustomButton
          kind="close"
          iconButtonProps={{ onClick: () => handleClose() }}
        />
        <MenuItem sx={{ pointerEvents: "none" }}>
          <IdentityDisplay
            name={content.name}
            title={content.jobTitle}
            avatar={content.avatar}
            maxWidth="220px"
          />
        </MenuItem>
        <Divider />
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <IconButton>
            <ForwardToInboxOutlinedIcon sx={{ fontSize: "31px" }} />
          </IconButton>
          <IconButton>
            <PhoneForwardedRoundedIcon sx={{ fontSize: "31px" }} />
          </IconButton>
        </Stack>
        <Typography variant="h4" sx={{ pl: 3, py: 1, fontSize: "12px" }}>
          Status
        </Typography>
        <MenuItem>
          <Typography>Never contacted</Typography>
        </MenuItem>
        <Divider />

        <Typography variant="h4" sx={{ pl: 3, py: 1, fontSize: "12px" }}>
          Personnel details
        </Typography>
        {PrivateDetails.map((detail) => {
          return (
            <MenuItem key={detail.title}>
              <ListItemIcon>{detail.icon}</ListItemIcon>
              <Stack
                direction={"row"}
                maxWidth={"220px"}
                alignItems={"center"}
                gap={2}
              >
                {/* <Typography variant="h4" sx={{ fontSize: "12px" }}>
                  {detail.title}
                </Typography> */}
                <Typography noWrap>{detail.value}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
        <Typography variant="h4" sx={{ pl: 3, py: 1, fontSize: "12px" }}>
          Company details
        </Typography>
        {CompanyDetails.map((detail) => {
          return (
            <MenuItem key={detail.title}>
              <ListItemIcon>{detail.icon}</ListItemIcon>
              <Stack
                direction={"row"}
                maxWidth={"220px"}
                alignItems={"center"}
                gap={2}
              >
                {/* <Typography variant="h4" sx={{ fontSize: "12px" }}>
                  {detail.title}
                </Typography> */}
                <Typography noWrap>{detail.value}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
