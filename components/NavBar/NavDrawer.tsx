import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { NavLinks } from "@/shared/interfaces/Links";
import Link from "next/link";

interface Props {
  drawerItems: Array<NavLinks>;
  handleDrawerToggle: any;
}
export const NavDrawer = ({ drawerItems, handleDrawerToggle }: Props) => {
  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {drawerItems.map((item: NavLinks) => {
          return (
            <ListItem key={item.name} disablePadding>
              {item.goto ? (
                <Link href={item.goto}>
                  <ListItemButton sx={{ color: "var(--accentlight)" }}>
                    <ListItemAvatar>{item.icon}</ListItemAvatar>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </Link>
              ) : (
                <>
                  <ListItemAvatar>{item.icon}</ListItemAvatar>
                  <ListItemText primary={item.name} />
                </>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
