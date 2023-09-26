import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import React from "react";
interface Props {
  title: string;
  tabsComponent?: React.ReactNode;
  actionComponent?: React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right";
}
export default function CustomCard({
  title,
  tabsComponent,
  actionComponent,
  children,
  position = "left",
}: Props) {
  const cardHeaderWithAction = {
    "& div:first-of-type": {
      flex: position == "left" ? "0 1 auto" : "1 0 auto",
    },
    gap: 4,
  };
  const cardHeaderWithTabs = {
    ...cardHeaderWithAction,
    paddingBlock: 0.5,
  };
  return (
    <Card>
      {title && (
        <CardHeader
          title={title}
          action={(tabsComponent || actionComponent) ?? null}
          sx={
            tabsComponent
              ? cardHeaderWithTabs
              : actionComponent
              ? cardHeaderWithAction
              : null
          }
        />
      )}
      <Divider />
      <CardContent
        sx={{
          overflow: "hidden",
          padding: 0,
          height: "100%",
          position: "relative",
          ":last-child": {
            padding: 0,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
