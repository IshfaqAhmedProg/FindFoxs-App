import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SearchForLeadsImage from "@/public/Images/SearchForLeads.png";
import EngageWithLeadsImage from "@/public/Images/EngageWithLeads.png";
import ManageYourLeadsImage from "@/public/Images/ManageYourLeads.png";
import CRMCapableImage from "@/public/Images/CRMCapable.png";
export default function FeaturesSection() {
  interface FeatureType {
    highlighted: string;
    title: string;
    desc: string;
    image: any;
    direction: string;
  }
  const featureList: FeatureType[] = [
    {
      highlighted: "Search",
      title: "for Leads",
      desc: "Search from millions of Leads that we provide in our up-to-date database of leads, or Add your own leads in bulk by uploading them.",
      image: SearchForLeadsImage,
      direction: "row",
    },
    {
      highlighted: "Engage",
      title: "with Leads",
      desc: "Send leads on your list Emails and Call them to convert them to a successful customer. Our enhanced systems allow you to convert 99% of your leads.",
      image: EngageWithLeadsImage,
      direction: "row-reverse",
    },
    {
      highlighted: "Manage",
      title: "your Leads",
      desc: "Sequentially add leads to whichever stage association, incubation, satisfied or not interested the lead is, allowing you to spend your resource on leads that matter.",
      image: ManageYourLeadsImage,
      direction: "row",
    },
  ];
  const Feature = ({ feature }: { feature: FeatureType }) => {
    const { highlighted, title, desc, image, direction } = feature;
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          flexDirection: { md: direction, sm: "column" },
          gap: { md: "12rem", sm: "2rem", xs: "2rem" },
        }}
      >
        <Stack alignItems="center" gap="1.0625rem">
          <h2>
            <span>{highlighted}</span> {title}
          </h2>
          <Typography width="30ch" textAlign="center">
            {desc}
          </Typography>
        </Stack>
        <Box
          sx={{ width: { xs: "100%", md: "50%" } }}
          display="flex"
          justifyContent="center"
        >
          <Image
            src={image}
            alt={`${highlighted} ${title}`}
            style={{ width: "100%", maxWidth: "25rem", height: "auto" }}
          />
        </Box>
      </Stack>
    );
  };
  return (
    <Stack width="100%" alignItems="center" gap="3.8125rem">
      <h2>
        One website with all your <span>Leads</span> needs!
      </h2>
      <Typography style={{ width: "30ch", textAlign: "center" }}>
        We have researched the market and brought together every single tool
        that a marketing or sales team needs.
      </Typography>
      {featureList.map((feature) => {
        return <Feature key={feature.title} feature={feature} />;
      })}
      <h2>
        Complete modern <span>CRM</span>
        <br />
        capabilities.
      </h2>
      <Typography style={{ width: "30ch", textAlign: "center" }}>
        Add Scrapefox to your websites to manage leads that come from your
        website and to generate new leads.
      </Typography>
      <Image
        style={{ width: "100%", maxWidth: "34.625rem", height: "auto" }}
        src={CRMCapableImage}
        alt="Complete modern CRM capabilities"
      />
    </Stack>
  );
}
