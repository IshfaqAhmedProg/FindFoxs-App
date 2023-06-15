import React from "react";
import { CardHeader, Button, Card, CardContent, Divider } from "@mui/material";
import ReadMoreRoundedIcon from "@mui/icons-material/ReadMoreRounded";
import CustomButton from "@/components/CustomComponents/CustomButton";
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
  const buttonIcon = <ReadMoreRoundedIcon />;
  const button = (
    <CustomButton
      kind="plain"
      buttonProps={{ startIcon: buttonIcon, "aria-label": `see more ${title}` }}
    >
      See More
    </CustomButton>
  );
  return (
    <Card
      sx={{
        minHeight: minHeight,
        overflowY: "hidden",
        gridRowStart: "span 2",
      }}
    >
      <CardHeader action={button} title={title} />
      <Divider />
      <CardContent sx={{ overflowY: "auto", padding: 0, height: "100%" }}>
        {children}
      </CardContent>
    </Card>
  );
}
