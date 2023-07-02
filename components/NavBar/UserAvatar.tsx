import React from "react";
import { Avatar } from "@mui/material";

import { User } from "firebase/auth";
import { stringAvatar } from "@/shared/functions/stringAvatar";
import Image from "next/image";

export default function UserAvatar({
  avatar,
  name,
}: {
  avatar: string | null | undefined;
  name: string | null | undefined;
}) {
  return avatar ? (
    <Avatar>
      <Image alt="User Avatar" src={avatar} width={35} height={35} />
    </Avatar>
  ) : name ? (
    <Avatar {...stringAvatar(name)} />
  ) : (
    <Avatar />
  );
}
