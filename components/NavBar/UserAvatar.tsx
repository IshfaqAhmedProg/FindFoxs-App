import React from "react";
import { Avatar } from "@mui/material";

import { User } from "firebase/auth";
import { stringAvatar } from "@/shared/functions/stringAvatar";

export default function UserAvatar({ user }: { user: User | null }) {
  if (user) {
    if (user.photoURL) {
      return <Avatar src={user.photoURL} />;
    } else if (user.displayName) {
      return <Avatar {...stringAvatar(user.displayName)} />;
    } else if (user.email) {
      return <Avatar {...stringAvatar(user.email)} />;
    }
  }
  return <Avatar />;
}
