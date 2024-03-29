import React, { lazy, Suspense } from "react";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import SearchForLeadsImage from "@/public/Images/SearchForLeads.png";
import EngageWithLeadsImage from "@/public/Images/EngageWithLeads.png";
import ManageYourLeadsImage from "@/public/Images/ManageYourLeads.png";
import CRMCapableImage from "@/public/Images/CRMCapable.png";
import EWLAnimation from "@public/Images/Animation/EWL.json";
import SFLAnimation from "@public/Images/Animation/SFL.json";
import MYLAnimation from "@public/Images/Animation/MYL.json";
import MYLOAnimation from "@public/Images/Animation/MYLOverlay.json";
import Loading from "../CustomComponents/Loading/Loading";
const Lottie = lazy(() => import("lottie-react"));
interface FeatureType {
  highlighted: string;
  title: string;
  desc: string;
  image: any;
  direction: string;
  animation?: React.ReactNode;
}
const featureList: FeatureType[] = [
  {
    highlighted: "Search",
    title: "for Leads",
    desc: "Search from millions of Leads that we provide in our up-to-date database of leads, or Add your own leads in bulk by uploading them.",
    image: SearchForLeadsImage,
    direction: "row",
    animation: (
      <Lottie
        animationData={SFLAnimation}
        style={{ width: "100%", maxWidth: "35rem", height: "auto" }}
        interactivity={{
          mode: "scroll",
          actions: [
            {
              visibility: [0.2, 0.4],
              type: "seek",
              frames: [0, 43],
            },
            {
              visibility: [0.4, 0.8],
              type: "loop",
              frames: [43, 199],
            },
          ],
        }}
      />
    ),
  },
  {
    highlighted: "Engage",
    title: "with Leads",
    desc: "Send leads on your list Emails and Call them to convert them to a successful customer. Our enhanced systems allow you to convert 99% of your leads.",
    image: EngageWithLeadsImage,
    direction: "row-reverse",
    animation: (
      <Lottie
        animationData={EWLAnimation}
        style={{ width: "100%", maxWidth: "35rem", height: "auto" }}
        interactivity={{
          mode: "scroll",
          actions: [
            {
              visibility: [0.2, 1.0],
              type: "seek",
              frames: [0, 120],
            },
          ],
        }}
      />
    ),
  },
  {
    highlighted: "Manage",
    title: "your Leads",
    desc: "Sequentially add leads to whichever stage association, incubation, satisfied or not interested the lead is, allowing you to spend your resource on leads that matter.",
    image: ManageYourLeadsImage,
    direction: "row",
    animation: (
      <Box position={"relative"} width={"32rem"} minHeight={512 / 1.8}>
        <Lottie
          animationData={MYLAnimation}
          style={{
            position: "absolute",
            inset: 0,
          }}
          interactivity={{
            mode: "scroll",
            actions: [
              {
                visibility: [0.2, 1.0],
                type: "seek",
                frames: [0, 120],
              },
            ],
          }}
        />
        <Lottie
          animationData={MYLOAnimation}
          style={{
            position: "absolute",
            inset: 0,
          }}
          interactivity={{
            mode: "cursor",
            actions: [
              {
                position: { x: [0, 1], y: [-1, 2] },
                type: "seek",
                frames: [0, 120],
              },
            ],
          }}
        />
      </Box>
    ),
  },
];
export default function FeaturesSection() {
  const theme = useTheme();
  const Feature = ({ feature }: { feature: FeatureType }) => {
    const { highlighted, title, desc, image, direction, animation } = feature;
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          flexDirection: { md: direction, sm: "column" },
          gap: { md: "12rem", sm: "2rem", xs: "2rem" },
        }}
      >
        <Stack alignItems="center" gap={5}>
          <h2
            data-aos={direction == "row-reverse" ? "fade-right" : "fade-left"}
          >
            <span>{highlighted}</span> {title}
          </h2>
          <Typography
            width="30ch"
            textAlign="center"
            data-aos="fade-down"
            data-aos-delay="300"
            fontSize={"16px"}
            color={"var(--primary)"}
          >
            {desc}
          </Typography>
        </Stack>

        <Box
          display="flex"
          justifyContent="center"
          flex={"1 0 auto"}
          data-aos={
            useMediaQuery(theme.breakpoints.down("md")) &&
            direction != "row-reverse"
              ? "fade-right"
              : "fade-left"
          }
          sx={{
            width: { xs: "100%", md: "50%" },
          }}
        >
          {useMediaQuery(theme.breakpoints.down("md")) || !animation ? (
            <Image
              src={image}
              alt={`${highlighted} ${title}`}
              style={{ width: "100%", maxWidth: "30rem", height: "auto" }}
            />
          ) : (
            <Suspense fallback={<Loading />}>{animation}</Suspense>
          )}
        </Box>
      </Stack>
    );
  };
  return (
    <Stack width="100%" alignItems="center" gap={20}>
      <Stack alignItems={"center"} gap={4}>
        <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"center"}>
          <h2 data-aos="zoom-in-down">One website with all your </h2>
          <h2 data-aos="flip-right" data-aos-delay="300">
            &nbsp;<span>Leads</span>&nbsp;
          </h2>
          <h2 data-aos="zoom-in-down" data-aos-delay="600">
            needs!
          </h2>
        </Stack>
        <Typography
          style={{ maxWidth: "40ch", textAlign: "center" }}
          fontSize={"16px"}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          We have researched the market and brought together every single tool
          that a marketing or sales team needs.
        </Typography>
      </Stack>
      {featureList.map((feature) => {
        return <Feature key={feature.title} feature={feature} />;
      })}
      <Stack alignItems={"center"} gap={8}>
        <h2 data-aos="zoom-in-down">
          Complete modern <span>CRM</span>
          <br />
          capabilities.
        </h2>
        <Typography
          style={{ width: "40ch", textAlign: "center" }}
          data-aos="fade-up"
          fontSize={"16px"}
        >
          Add FindFoxs to your websites to manage leads that come from your
          website and to generate new leads.
        </Typography>
        <Image
          style={{ width: "100%", maxWidth: "34.625rem", height: "auto" }}
          src={CRMCapableImage}
          alt="Complete modern CRM capabilities"
          data-aos="fade-down"
        />
      </Stack>
    </Stack>
  );
}
