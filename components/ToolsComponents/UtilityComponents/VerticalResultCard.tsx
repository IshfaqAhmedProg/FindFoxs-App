import CustomBox from "@/components/CustomComponents/CustomBox";
import { Box, Typography } from "@mui/material";
import React from "react";
interface Props {
  children: React.ReactNode;
  title: string;
  titleColor: string;
}
export default function VerticalResultCard({
  children,
  title,
  titleColor,
}: Props) {
  return (
    <CustomBox
      overflow="hidden"
      py={2}
      px={2}
      sx={{ overflowY: "auto", overflowX: "hidden" }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxHeight="400px"
      minHeight="21.875rem"
      justifyContent="space-between"
      height="100%"
      variant="inner"
    >
      <Typography fontWeight={"bold"} variant="h4" color={titleColor}>
        {title}
      </Typography>
      {children}
    </CustomBox>
  );
}
