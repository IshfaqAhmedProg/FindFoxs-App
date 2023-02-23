import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import Image from "next/image";
import Logo from "../../public/Logos/VerifyFoxLogo.svg";
import { NavLinks } from "@/shared/interfaces/NavLinks";
import { stringAvatar } from "@/shared/functions/stringAvatar";

interface Props {
  navLinks: Array<NavLinks>;
  handleDrawerToggle: any;
}
export const NavDrawer = ({ navLinks, handleDrawerToggle }: Props) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 3, mx: "auto", width: "fit-content" }}>
        <Avatar
          {...stringAvatar("Ishfaq Ahmed")}
          sx={{ width: 60, height: 60 }}
        />
      </Box>
      <Divider />
      <List>
        {navLinks.map((item: NavLinks) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              href={item.goto}
              sx={{ color: "var(--accentlight)" }}
            >
              <ListItemAvatar>{item.icon}</ListItemAvatar>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
