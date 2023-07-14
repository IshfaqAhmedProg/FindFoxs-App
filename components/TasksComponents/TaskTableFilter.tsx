import React, { useState, Fragment } from "react";
import { Stack, Typography, Autocomplete, Menu, Chip } from "@mui/material";
import CustomTextInput from "../CustomComponents/CustomTextInput";
import CustomButton from "../CustomComponents/CustomButton";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import MonitorHeartRoundedIcon from "@mui/icons-material/MonitorHeartRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { statuses, tools } from "@/shared/interfaces/Tasks";
import { useTable } from "@/contexts/TableContext";
import { Filter } from "@/shared/interfaces/Table";
export type ITaskTableFilter = "tool" | "status" | string;
interface TaskTableFilterObject {
  title: string;
  label: ITaskTableFilter;
  icon: React.ReactNode;
  filterOptions: Array<string>;
}
const TasksTableFilters: Array<TaskTableFilterObject> = [
  {
    title: "Tool",
    label: "tool",
    icon: <ConstructionRoundedIcon />,
    filterOptions: tools,
  },
  {
    title: "Status",
    label: "status",
    icon: <MonitorHeartRoundedIcon />,
    filterOptions: statuses,
  },
];

export default function TaskTableFilter() {
  const { handleSetFilter, selectedFilters } = useTable();
  const Filter = ({ filter }: { filter: TaskTableFilterObject }) => {
    const [filterOpenAnchor, setFilterOpenAnchor] =
      useState<null | HTMLElement>(null);
    const filterOpen = Boolean(filterOpenAnchor);
    function handleFilterClick(event: React.MouseEvent<HTMLElement>) {
      setFilterOpenAnchor(event.currentTarget);
    }
    function handleFilterClose() {
      setFilterOpenAnchor(null);
    }
    const [selectedOption, setSelectedOption] = useState<Filter>({
      label: "",
      value: [],
    });
    return (
      <>
        <CustomButton
          kind="plain"
          buttonProps={{
            id: filter.title,
            startIcon: filter.icon,
            sx:
              selectedFilters.label == filter.label
                ? {
                    "& .MuiSvgIcon-root": {
                      color: "var(--primarylight)",
                    },
                    color: "var(--primarylight)",
                  }
                : {
                    "& .MuiSvgIcon-root": {
                      color: "var(--graylight)",
                    },
                    color: "var(--graylight)",
                  },
            onClick: handleFilterClick,
          }}
        >
          {filter.title}
        </CustomButton>
        <Menu
          anchorEl={filterOpenAnchor}
          open={filterOpen}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Stack px={3} py={2}>
            <Stack alignItems={"center"}>
              <Autocomplete
                multiple
                size="small"
                options={filter.filterOptions}
                limitTags={5}
                onChange={(e, value) => {
                  value && setSelectedOption({ label: filter.label, value });
                }}
                renderInput={(params) => (
                  <CustomTextInput
                    placeholder={`Select ${filter.label}`}
                    sx={{ minWidth: "250px", maxWidth: "250px" }}
                    {...params}
                    //   disabled={formData.keywords.length == 5}
                  />
                )}
              />
              <CustomButton
                kind="plain"
                buttonProps={{
                  startIcon: <CheckRoundedIcon />,
                  onClick: (e) => {
                    handleSetFilter(selectedOption);
                  },
                  sx: { mt: 1 },
                }}
              >
                Filter
              </CustomButton>
            </Stack>
          </Stack>
        </Menu>
      </>
    );
  };
  return (
    <>
      <CustomTextInput placeholder="Search by Id" />
      {TasksTableFilters.map((filter) => {
        return (
          <Fragment key={filter.title}>
            <Filter filter={filter} />
          </Fragment>
        );
      })}
    </>
  );
}
