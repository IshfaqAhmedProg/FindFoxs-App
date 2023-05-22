import React from "react";
import { Typography, Stack, Avatar } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
interface Props {
  avatar?: string;
  name: string;
  title?: string;
  maxWidth: string;
}
export default function IdentityDisplay({
  avatar,
  name,
  title,
  maxWidth,
}: Props) {
  return (
    <>
      {avatar ? (
        <Avatar src={avatar} />
      ) : name ? (
        <Avatar {...stringAvatar(name)} />
      ) : (
        ""
      )}
      <Stack textOverflow="ellipsis" width={maxWidth} overflow="hidden">
        <Typography sx={{ fontWeight: "bold", color: "var(--primary)" }} noWrap>
          {name}
        </Typography>
        {title && (
          <Typography
            sx={{ color: "var(--primarydark)", fontSize: "11px" }}
            noWrap
          >
            {title}
          </Typography>
        )}
      </Stack>
    </>
  );
}
