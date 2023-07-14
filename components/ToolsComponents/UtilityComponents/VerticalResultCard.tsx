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
    <CustomBox boxProps={{ overflow: "hidden" }} variant="inner">
      <Box
        py={2}
        px={2}
        sx={{ overflowY: "auto", overflowX: "hidden" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        height={"100%"}
      >
        <Typography fontWeight={"bold"} variant="h4" color={titleColor}>
          {title}
        </Typography>
        {children}
      </Box>
    </CustomBox>
  );
}
