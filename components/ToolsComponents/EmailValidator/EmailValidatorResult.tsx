import CustomBox from "@/components/CustomComponents/CustomBox";
import Task from "@/shared/interfaces/Tasks";
import { Box, Typography } from "@mui/material";
import React from "react";
import CustomDoughnutCard from "@/components/CustomComponents/CustomDoughnutCard";

import ResultSummaryCard from "@/components/ToolsComponents/UtilityComponents/ResultSummaryCard";
import VerticalCardWrapper from "@/components/ToolsComponents/UtilityComponents/VerticalCardWrapper";
import sumObjectValues from "@/shared/functions/sumObjectValues";
export default function EmailValidatorResult({ task }: { task: Task }) {
  const totalUndeliverable = sumObjectValues(task.result?.undeliverable) ?? 0;
  const totalUnknown = sumObjectValues(task.result?.unknown) ?? 0;
  const totalRisky = sumObjectValues(task.result?.risky);
  const total =
    (task.result?.deliverable ?? 0) +
    totalUndeliverable +
    totalRisky +
    totalUnknown;
  const deliverableDataColors = [
    "#13A386",
    "#ff4545",
    "#5467E4",
    "#303f9f",
    "#b1bad2",
  ];
  const undeliverableDataColors = ["#ff4545", "#fd7777", "#fda6a6", "#fdc3c3"];
  const unknownDataColors = ["#4e5263", "#7c7e85", "#b1bad2", "#c7c7e7"];
  const riskyDataColors = ["#1d276b", "#313f9d"];
  const unknownData = [
    {
      id: "No_Connect",
      label: "No Connect",
      value: task.result?.unknown.no_connect ?? 0,
    },
    {
      id: "Timeout",
      label: "Timeout",
      value: task.result?.unknown.timeout ?? 0,
    },
    {
      id: "Unavailable_SMTP",
      label: "Unavailable SMTP",
      value: task.result?.unknown.unavailable_smtp ?? 0,
    },
    {
      id: "Unexpected_Error",
      label: "Unexpected Error",
      value: task.result?.unknown.unexpected_error ?? 0,
    },
  ];
  const riskyData = [
    {
      id: "Low_Quality",
      label: "Low Quality",
      value: task.result?.risky.low_quality ?? 0,
    },
    {
      id: "Low_Deliverability",
      label: "Low Deliverability",
      value: task.result?.risky.low_deliverability ?? 0,
    },
  ];
  const deliverableData = [
    {
      id: "Deliverable",
      label: "Deliverable",
      value: task.result?.deliverable ?? 0,
    },
    {
      id: "Undeliverable",
      label: "Undeliverable",
      value: totalUndeliverable ?? 0,
    },
    {
      id: "Duplicate",
      label: "Duplicate",
      value: task.result?.duplicate ?? 0,
    },
    {
      id: "Risky",
      label: "Risky",
      value: totalRisky ?? 0,
    },
    {
      id: "Unknown",
      label: "Unknown",
      value: totalUnknown ?? 0,
    },
  ];
  const undeliverableData = [
    {
      id: "Invalid_Email",
      label: "Invalid Email",
      value: task.result?.undeliverable.invalid_email ?? 0,
    },
    {
      id: "Invalid_Domain",
      label: "Invalid Domain",
      value: task.result?.undeliverable.invalid_domain ?? 0,
    },
    {
      id: "Rejected_Email",
      label: "Rejected Email",
      value: task.result?.undeliverable.rejected_email ?? 0,
    },
    {
      id: "Invalid_SMTP",
      label: "Invalid SMTP",
      value: task.result?.undeliverable.invalid_smtp ?? 0,
    },
  ];

  return (
    <Box
      display={"grid"}
      gridTemplateRows={"1fr 1fr"}
      gridTemplateColumns={"repeat(3,1fr)"}
      width={"100%"}
      height={"100%"}
      gap={2}
      p={2}
    >
      <Box
        gridColumn="span 2"
        display="flex"
        py={2}
        px={4}
        alignItems="center"
        justifyContent="space-around"
        gap={2}
      >
        <CustomDoughnutCard
          centerValue={(
            ((task.result?.deliverable ?? 100) / total) *
            100
          ).toFixed(1)}
          colors={deliverableDataColors}
          unit="Deliverable"
          data={deliverableData}
          total={total}
          maxHeight="300px"
        />
      </Box>
      <CustomBox
        boxProps={{
          sx: { gridColumnStart: "3" },
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <ResultSummaryCard task={task} />
      </CustomBox>
      <VerticalCardWrapper>
        <Typography fontWeight={"bold"} variant="h4" color={"var(--error)"}>
          Undeliverable
        </Typography>
        <CustomDoughnutCard
          centerValue={((totalUndeliverable / total) * 100).toFixed(1)}
          colors={undeliverableDataColors}
          data={undeliverableData}
          unit={totalUndeliverable.toString()}
          total={totalUndeliverable}
          maxHeight="200px"
        />
      </VerticalCardWrapper>
      <VerticalCardWrapper>
        <Typography
          fontWeight={"bold"}
          variant="h4"
          color={"var(--primarydark)"}
        >
          Risky
        </Typography>
        <CustomDoughnutCard
          centerValue={((totalRisky / total) * 100).toFixed(1)}
          colors={riskyDataColors}
          data={riskyData}
          unit={totalRisky.toString()}
          total={totalRisky}
          maxHeight="200px"
        />
      </VerticalCardWrapper>
      <VerticalCardWrapper>
        <Typography fontWeight={"bold"} variant="h4" color={"var(--graylight)"}>
          Unknown
        </Typography>
        <CustomDoughnutCard
          centerValue={((totalUnknown / total) * 100).toFixed(1)}
          colors={unknownDataColors}
          data={unknownData}
          unit={totalUnknown.toString()}
          total={totalUnknown}
          maxHeight="200px"
        />
      </VerticalCardWrapper>
    </Box>
  );
}
