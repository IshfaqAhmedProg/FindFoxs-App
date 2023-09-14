import CustomButton from "@/components/CustomComponents/CustomButton";
import CustomCard from "@/components/CustomComponents/CustomCard";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import CustomContainer from "../../CustomComponents/CustomContainer";

export default function ToolsLayout({
  children,
  title,
  singleResultCard,
  toolVideo,
}: {
  children: React.ReactNode;
  title: string;
  singleResultCard?: React.ReactNode;
  toolVideo: React.ReactNode;
}) {
  return (
    <CustomCard
      title={title}
      action={
        <Link href={"/tasks"}>
          <CustomButton kind="plain" sx={{ color: "var(--primary)" }}>
            History
          </CustomButton>
        </Link>
      }
      actionPos="right"
    >
      <CustomContainer>
        <Box
          rowGap={2}
          columnGap={2}
          p={2}
          sx={{
            justifyItems: "center",
            ["@container (max-width: 720px)"]: {
              gridTemplateColumns: "1fr",
              gridTemplateRows: "1fr 1fr 1fr",
            },
          }}
          display={"grid"}
          width={"100%"}
          height={"100%"}
          gridTemplateColumns={"1fr 1fr"}
          gridTemplateRows={"1fr"}
        >
          <Stack
            py={4}
            alignItems={"center"}
            gap={5}
            maxWidth={"600px"}
            position={"relative"}
          >
            {children}
          </Stack>
          {singleResultCard && singleResultCard}
          {toolVideo}
        </Box>
      </CustomContainer>
    </CustomCard>
  );
}
