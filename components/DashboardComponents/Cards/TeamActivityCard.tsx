"use client";

import React from "react";
import DashboardCardsLayout from "./DashboardCardsLayout";
import {
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import Stats from "@/shared/interfaces/Stats";
import SingleStatSmall from "@/components/DisplayStats/SingleStatSmall";
import SingleStatBig from "@/components/DisplayStats/SingleStatBig";
import { ResponsiveBar } from "@nivo/bar";
import data from "@/shared/data/MockTeamActivity.json";
import { nivoTheme } from "@/shared/theme/nivoTheme";

const peopleOnlineData = [
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
  { name: "John Bradley", profileImage: "/Images/genericperson1.png" },
];
const PeopleOnlineAvatars = (
  <AvatarGroup total={peopleOnlineData.length}>
    {peopleOnlineData.map((person, index) => {
      if (index < 3)
        return (
          <Tooltip key={index} title={person.name}>
            <Avatar alt={person.name} src={person.profileImage} />
          </Tooltip>
        );
    })}
  </AvatarGroup>
);
const statData: Array<Stats> = [
  {
    statTitle: "Most emails sent",
    statTitleTrailing: "this month",
    stats: [{ title: "John Bradley", stat: "80", statUnit: "emails" }],
  },
  {
    statTitle: "Most calls made",
    statTitleTrailing: "this month",
    stats: [
      { title: "John Bradley", stat: "80", statUnit: "calls" },
      { title: "Peter Petely", stat: "70", statUnit: "calls" },
      { title: "Weter Wetely", stat: "58", statUnit: "calls" },
    ],
  },
  {
    statTitle: "Most new leads added",
    statTitleTrailing: "this month",
    stats: [
      { title: "Peter Petely", stat: "70", statUnit: "leads" },
      { title: "Weter Wetely", stat: "58", statUnit: "leads" },
    ],
  },
];

export default function TeamActivityCard() {
  return (
    <DashboardCardsLayout minHeight="748px" title="Team Activity">
      <Stack gap={4} pt={3}>
        <Box
          position="relative"
          height="450px"
          display="flex"
          justifyContent="center"
        >
          <ResponsiveBar
            data={data}
            keys={[
              "New Leads",
              "Emails Sent",
              "Calls Made",
              "Converted To Satisfied",
            ]}
            indexBy="month"
            margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={["#1D276B", "#303F9F", "#5467E4", "#13A386", "#064C2C"]}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            borderRadius={2}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "month",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["brighter", 3]],
            }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top",
                direction: "row",
                justify: false,
                translateX: -10,
                translateY: -30,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Team Activities"
            barAriaLabel={(e) =>
              e.id + ": " + e.formattedValue + " in month: " + e.indexValue
            }
            theme={nivoTheme}
          />
        </Box>

        <Stack direction="row" justifyContent="space-between" paddingX={6}>
          <SingleStatBig
            title="Total Calls by team"
            statUnit="this month"
            stat="80"
          />
          <SingleStatBig
            title="Total Emails by team"
            statUnit="this month"
            stat="250"
          />
        </Stack>
        <Stack gap={2} paddingX={6}>
          {statData.map((stat) => {
            return <SingleStatSmall key={stat.statTitle} stat={stat} />;
          })}
          <Stack>
            <Typography variant="h5">Team members online</Typography>
            {PeopleOnlineAvatars}
          </Stack>
        </Stack>
      </Stack>
    </DashboardCardsLayout>
  );
}
