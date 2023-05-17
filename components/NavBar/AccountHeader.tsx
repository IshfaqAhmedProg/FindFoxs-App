import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Typography, Stack } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import UserAvatar from "./UserAvatar";
export default function AccountHeader() {
  const { user } = useAuth();
  return (
    <>
      {user && <UserAvatar user={user} />}
      <Stack textOverflow="ellipsis" width="15ch" overflow="hidden">
        <Typography
          sx={{ fontWeight: "bold", color: "var(--primarydark)" }}
          noWrap
        >
          {user.email}
        </Typography>
        <p style={{ color: "var(--primarydark)", fontSize: "11px" }}>Role</p>
      </Stack>
    </>
  );
}
