import React, { useState } from "react";
import CustomTextInput from "../CustomComponents/CustomTextInput";
import CustomButton from "../CustomComponents/CustomButton";
import { LeadAction } from "@/shared/interfaces/Lead";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import FactoryRoundedIcon from "@mui/icons-material/FactoryRounded";
import { Menu } from "@mui/material";
import { Stack, Typography, Autocomplete } from "@mui/material";
import jobTitles from "@/shared/data/ListOfJobTitles.json";

const LeadTableFilters: Array<LeadAction> = [
  {
    title: "Job Title",
    icon: <MilitaryTechOutlinedIcon />,
  },
  { title: "Company", icon: <ApartmentRoundedIcon /> },
  { title: "Location", icon: <PinDropRoundedIcon /> },
  { title: "Industry", icon: <FactoryRoundedIcon /> },
];

export default function SearchLeadsFilter() {
  const [filterOpenAnchor, setFilterOpenAnchor] = useState<null | HTMLElement>(
    null
  );
  const addonOpen = Boolean(filterOpenAnchor);
  function handleFilterClick(event: React.MouseEvent<HTMLElement>) {
    setFilterOpenAnchor(event.currentTarget);
  }
  function handleFilterClose() {
    setFilterOpenAnchor(null);
  }
  console.log(filterOpenAnchor);
  const Filter = ({ filterTitle }: { filterTitle: string }) => {
    return (
      <>
        <Stack px={3} py={2}>
          <Typography>{filterTitle}</Typography>
          <Autocomplete
            freeSolo
            multiple
            size="small"
            options={jobTitles}
            limitTags={5}
            //   value={formData.keywords}
            //   onChange={(e, val) => {
            //     handleKeywordChange(val);
            //   }}
            renderInput={(params) => (
              <CustomTextInput
                placeholder="Enter Job Title"
                sx={{ minWidth: "300px", maxWidth: "300px" }}
                {...params}
                //   disabled={formData.keywords.length == 5}
              />
            )}
          />
        </Stack>
      </>
    );
  };
  return (
    <>
      <CustomTextInput placeholder="Search by Name" />
      {LeadTableFilters.map((filter) => {
        return (
          <CustomButton
            key={filter.title}
            kind="plain"
            buttonProps={{
              id: filter.title,
              startIcon: filter.icon,
              sx: { color: "var(--graylight)" },
              onClick: handleFilterClick,
            }}
          >
            {filter.title}
          </CustomButton>
        );
      })}
      <Menu
        anchorEl={filterOpenAnchor}
        open={addonOpen}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ mt: 3 }}
      >
        <Filter filterTitle={`Filter by ${filterOpenAnchor?.id ?? ""}:`} />
      </Menu>
    </>
  );
}
