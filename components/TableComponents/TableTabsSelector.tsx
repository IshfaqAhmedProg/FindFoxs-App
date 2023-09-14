import { useTable } from "@/contexts/TableContext";
import { Stack } from "@mui/material";
import CustomButton from "../CustomComponents/CustomButton";

interface Props {
  tableTabs: Array<string>;
}
export default function TableTabsSelector({ tableTabs }: Props) {
  const { activeTab, handleTabChange } = useTable();
  return (
    <Stack direction="row" gap={2} ml={2} pt={0.15}>
      {tableTabs.map((tab) => (
        <CustomButton
          key={tab}
          kind="plain"
          sx={
            activeTab == tab
              ? { color: "var(--primary)" }
              : { color: "var(--graylight)" }
          }
          onClick={(e) => handleTabChange({ tab })}
        >
          {tab}
        </CustomButton>
      ))}
    </Stack>
  );
}
