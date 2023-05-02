import React from "react";
import {
  CardHeader,
  IconButton,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
export default function LeadConversionCard() {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton aria-label="" sx={{ padding: 0 }}>
            <ReadMoreRoundedIcon sx={{ color: "var(--graydark)" }} />
          </IconButton>
        }
        title="Leads Conversion"
      />
      <Divider />
      <CardContent>Hello</CardContent>
    </Card>
  );
}
