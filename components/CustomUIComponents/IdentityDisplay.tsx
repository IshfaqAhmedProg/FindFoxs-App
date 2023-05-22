import React from "react";
import { Typography, Stack, Avatar } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import Image from "next/image";
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
        <Avatar>
          <Image src={avatar} alt={name} width={70} height={70} />
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
