import React from "react";
import CustomButton from "../CustomComponents/CustomButton";
import {
  Stack,
  IconButton,
  Typography,
  Divider,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { Lead } from "@/shared/interfaces/Lead";
import IdentityDisplay from "../CustomComponents/IdentityDisplay/IdentityDisplay";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import PhoneForwardedRoundedIcon from "@mui/icons-material/PhoneForwardedRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import CustomIconButton from "../CustomComponents/CustomIconButton";
export default function SingleLeadCard({
  content,
  handleClose,
}: {
  content: Lead;
  handleClose: (e: React.MouseEvent<HTMLElement>) => void;
}) {
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
  return (
    <>
      <CustomIconButton kind="close" onClick={handleClose} />
      <MenuItem sx={{ pointerEvents: "none" }}>
        <IdentityDisplay
          name={content.name}
          title={content.jobTitle}
          avatar={content.image}
        />
      </MenuItem>
      <Divider />
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={1}
      >
        <CustomIconButton>
          <Tooltip title="Send an email!">
            <ForwardToInboxOutlinedIcon sx={{ fontSize: "31px" }} />
          </Tooltip>
        </CustomIconButton>
        <CustomIconButton>
          <Tooltip title="Make a call!">
            <PhoneForwardedRoundedIcon sx={{ fontSize: "31px" }} />
          </Tooltip>
        </CustomIconButton>
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
              <Typography noWrap>{detail.value}</Typography>
            </Stack>
          </MenuItem>
        );
      })}
    </>
  );
}
