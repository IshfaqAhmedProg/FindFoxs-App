import React from "react";
import { Avatar } from "@mui/material";

import { User } from "firebase/auth";
import { stringAvatar } from "@/shared/functions/stringAvatar";

export default function UserAvatar({ user }: { user: User }) {
  if (user.photoURL) {
    return <Avatar src={user.photoURL} />;
  } else if (user.displayName) {
    return <Avatar {...stringAvatar(user.displayName)} />;
  } else {
    return <Avatar />;
  }
}
