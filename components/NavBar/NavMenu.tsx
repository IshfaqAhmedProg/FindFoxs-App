import React from "react";
import { Menu, MenuItem, Divider, ListItemIcon } from "@mui/material";
import { NavLinks } from "@/shared/interfaces/Links";
import { useRouter } from "next/router";
interface NavMenu {
  id: string;
  accountOpenAnchor: null | HTMLElement;
  accountOpen: boolean;
  handleClose: (param: any) => void;
  items: Array<NavLinks>;
  header?: React.ReactElement;
}
export default function NavMenu({
  id,
  accountOpenAnchor,
  accountOpen,
  handleClose,
  items,
  header,
}: NavMenu) {
  const router = useRouter();
  return (
    <Menu
      anchorEl={accountOpenAnchor}
      id={id}
      open={accountOpen}
      onClose={handleClose}
      onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {header && <MenuItem>{header}</MenuItem>}
      {header && <Divider />}

      {items.map((menuItem: any) => {
        if (router.pathname !== menuItem.goto)
          return (
            <MenuItem onClick={menuItem.handler} key={menuItem.name}>
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              {menuItem.name}
            </MenuItem>
          );
      })}
    </Menu>
  );
}
