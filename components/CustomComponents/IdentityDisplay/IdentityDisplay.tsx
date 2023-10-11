import React from "react";
import { Typography, Stack, Avatar } from "@mui/material";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import Image from "next/image";
interface Props {
  avatar?: string | null | undefined;
  name: string | null | undefined;
  title?: string;
}
export default function IdentityDisplay({ avatar, name, title }: Props) {
  return (
    <>
      {avatar ? (
        <Avatar>
          <Image alt="Lead Avatar" src={avatar} width={40} height={40} />
        </Avatar>
      ) : name ? (
        <Avatar
          src={`https://source.boringavatars.com/bauhaus/40/${name}?colors=ffffff,5467e4,303f9f`}
        />
      ) : (
        ""
      )}
      <Stack textOverflow="ellipsis" width={"15ch"} overflow="hidden">
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
