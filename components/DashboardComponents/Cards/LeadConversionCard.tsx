import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import CircularProgress from "@/components/CustomComponents/ProgressBars/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalProgress from "@/components/CustomComponents/ProgressBars/HorizontalProgress";
export default function LeadConversionCard() {
  const leadConversionDetails = [
    {
      title: "New Leads Added",
      subtitle: "this month",
      value: 50,
      maxValue: 100,
    },
    {
      title: "Contacts that opened mail",
      subtitle: "this month",
      value: 62,
      maxValue: 100,
    },
    {
      title: "Emails sent to leads",
      subtitle: "this month",
      value: 28,
      maxValue: 100,
    },
    {
      title: "Called Leads",
      subtitle: "this month",
      value: 35,
      maxValue: 100,
    },
  ];
  return (
    <DashboardCardsLayout title="Lead Conversion" minHeight="357px">
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-around"
        marginY="auto"
        pt={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          maxWidth="12rem"
          gap={1}
          alignItems="center"
        >
          <CircularProgress value={75} />
          <Typography textAlign="center" variant="body2">
            <strong>303</strong> Leads Converted to Satisfied out of{" "}
            <strong>387</strong>
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={4}>
          {leadConversionDetails.map((detail) => {
            return (
              <HorizontalProgress
                key={detail.title}
                value={detail.value}
                maxValue={detail.maxValue}
                title={detail.title}
                subtitle={detail.subtitle}
                valueId="Goal"
              />
            );
          })}
        </Box>
      </Stack>
    </DashboardCardsLayout>
  );
}
