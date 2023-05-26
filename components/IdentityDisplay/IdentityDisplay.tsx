import React from "react";
import { Typography, Stack, Avatar } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import Image from "next/image";
interface Props {
  avatar?: string | null | undefined;
  name: string | null | undefined;
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
        <Avatar>
          <Image alt="Lead Avatar" src={avatar} width={40} height={40} />
        </Avatar>
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
