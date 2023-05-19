import React from "react";
import {
  CardHeader,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
interface Props {
  children?: React.ReactElement | Array<React.ReactElement>;
  title: string;
  minHeight: string;
}
export default function DashboardCardsLayout({
  children,
  title,
  minHeight,
}: Props) {
  return (
    <Card
      sx={{
        minHeight: minHeight,
        overflowY: "hidden",
        gridRowStart: "span 2",
      }}
    >
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
            See More
          </Button>
        }
        title={title}
      />
      <Divider />
      <CardContent sx={{ overflowY: "auto", padding: 0, height: "100%" }}>
        {children}
      </CardContent>
    </Card>
  );
}
