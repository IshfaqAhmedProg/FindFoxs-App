import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import React from "react";
interface Props {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  actionPos?: "left" | "right";
}
export default function CustomCard({
  title,
  action,
  children,
  actionPos = "left",
}: Props) {
  return (
    <Card>
      <CardHeader
        title={title}
        action={action ?? null}
        sx={
          actionPos == "left"
            ? {
                "& div:first-of-type": {
                  flex: "0 1 auto",
                },
              }
            : {
                "& div:first-of-type": {
                  flex: "1 0 auto",
                },
              }
        }
      />
      <Divider />
      <CardContent
        sx={{
          overflow: "hidden",
          padding: 0,
          height: "100%",
          position: "relative",
          ":last-child": {
            display: "flex",
            flexDirection: "column",
            padding: 0,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
