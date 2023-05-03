import React from "react";
import {
  CardHeader,
  Button,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
interface Props {
  children?: React.ReactElement | JSX.Element;
  title: string;
  minHeight: string;
}
export default function DashboardCardsLayout({
  children,
  title,
  minHeight,
}: Props) {
  return (
    <Card sx={{ minHeight: minHeight, overflowY: "hidden" }}>
      <CardHeader
        action={
          <Button
            aria-label={`view more ${title}`}
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              color: "var(--graylight)",
              fontSize: "14px",
              ":hover": {
                boxShadow: "none",
              },
              padding: "0 8px",
            }}
            startIcon={
              <ReadMoreRoundedIcon sx={{ color: "var(--graylight)" }} />
            }
          >
            View All
          </Button>
        }
        title={title}
      />
      <Divider />
      <CardContent sx={{ overflowY: "auto", my: "auto" }}>
        {children}
      </CardContent>
    </Card>
  );
}
