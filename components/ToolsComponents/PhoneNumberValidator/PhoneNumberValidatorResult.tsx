import DoughnutCard from "@/components/CustomComponents/DoughnutCard/DoughnutCard";
import ResultSummaryCard from "@/components/ToolsComponents/UtilityComponents/ResultSummaryCard";
import VerticalResultCard from "@/components/ToolsComponents/UtilityComponents/VerticalResultCard";
import sumObjectValues from "@/shared/functions/sumObjectValues";
import Task from "@/shared/interfaces/Tasks";
import { Stack } from "@mui/material";

export default function PhoneNumberValidatorResult({ task }: { task: Task }) {
  console.log("task", task);
  const totalUndeliverable =
    sumObjectValues(task.response?.Undeliverable) ?? 728;
  const totalUnknown = sumObjectValues(task.response?.Unknown) ?? 403;
  const totalRisky = sumObjectValues(task.response?.Risky) ?? 1372;
  const total =
    (task.response?.Deliverable ?? 3802) +
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
      value: task.response?.Unknown.No_connect ?? 102,
    },
    {
      id: "Timeout",
      label: "Timeout",
      value: task.response?.Unknown.Timeout ?? 36,
    },
    {
      id: "Unavailable_SMTP",
      label: "Unavailable SMTP",
      value: task.response?.Unknown.Unavailable_smtp ?? 137,
    },
    {
      id: "Unexpected_Error",
      label: "Unexpected Error",
      value: task.response?.Unknown.Unexpected_error ?? 128,
    },
  ];
  const riskyData = [
    {
      id: "Low_Quality",
      label: "Low Quality",
      value: task.response?.Risky.Low_quality ?? 488,
    },
    {
      id: "Low_Deliverability",
      label: "Low Deliverability",
      value: task.response?.Risky.Low_deliverability ?? 884,
    },
  ];
  const deliverableData = [
    {
      id: "Deliverable",
      label: "Deliverable",
      value: task.response?.Deliverable ?? 3802,
    },
    {
      id: "Undeliverable",
      label: "Undeliverable",
      value: totalUndeliverable,
    },
    {
      id: "Duplicate",
      label: "Duplicate",
      value: task.response?.Duplicate ?? 195,
    },
    {
      id: "Risky",
      label: "Risky",
      value: totalRisky,
    },
    {
      id: "Unknown",
      label: "Unknown",
      value: totalUnknown,
    },
  ];
  const undeliverableData = [
    {
      id: "Invalid_Email",
      label: "Invalid Email",
      value: task.response?.Undeliverable.Invalid_email ?? 319,
    },
    {
      id: "Invalid_Domain",
      label: "Invalid Domain",
      value: task.response?.Undeliverable.Invalid_domain ?? 106,
    },
    {
      id: "Rejected_Email",
      label: "Rejected Email",
      value: task.response?.Undeliverable.Rejected_email ?? 180,
    },
    {
      id: "Invalid_SMTP",
      label: "Invalid SMTP",
      value: task.response?.Undeliverable.Invalid_smtp ?? 123,
    },
  ];

  return (
    <Stack width={"100%"} height={"100%"} gap={5} sx={{ overflowY: "auto" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
        flexWrap={"wrap"}
        gap={3}
        mt={3}
      >
        <Stack direction={"row"}>
          <DoughnutCard
            centerValue={(
              ((task.response?.Deliverable ?? 3802) / total) *
              100
            ).toFixed(1)}
            colors={deliverableDataColors}
            unit="Deliverable"
            data={deliverableData}
            total={total}
            maxHeight="300px"
          />
        </Stack>
        <ResultSummaryCard task={task} />
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={3}
        alignItems={"flex-start"}
        flexWrap={"wrap"}
      >
        <VerticalResultCard title="Undeliverable" titleColor="var(--error)">
          <DoughnutCard
            centerValue={((totalUndeliverable / total) * 100).toFixed(1)}
            colors={undeliverableDataColors}
            data={undeliverableData}
            unit={totalUndeliverable.toString()}
            total={totalUndeliverable}
            maxHeight="200px"
          />
        </VerticalResultCard>
        <VerticalResultCard title="Risky" titleColor="var(--primarydark)">
          <DoughnutCard
            centerValue={((totalRisky / total) * 100).toFixed(1)}
            colors={riskyDataColors}
            data={riskyData}
            unit={totalRisky.toString()}
            total={totalRisky}
            maxHeight="200px"
          />
        </VerticalResultCard>
        <VerticalResultCard title="Unknown" titleColor="var(--graylight)">
          <DoughnutCard
            centerValue={((totalUnknown / total) * 100).toFixed(1)}
            colors={unknownDataColors}
            data={unknownData}
            unit={totalUnknown.toString()}
            total={totalUnknown}
            maxHeight="200px"
          />
        </VerticalResultCard>
      </Stack>
    </Stack>
  );
}
