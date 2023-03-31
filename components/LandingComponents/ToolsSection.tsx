import React from "react";
import Image from "next/image";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";

import EmailAddressValidatorImage from "@/public/Icons/EmailAddressValidator.svg";
import GoogleMapsScraperImage from "@/public/Icons/GoogleMapsScraper.svg";
import PhoneNumberValidatorImage from "@/public/Icons/PhoneNumberValidator.svg";
import WhatsAppValidatorImage from "@/public/Icons/WhatsAppValidator.svg";
import EmailAndContactsScraperImage from "@/public/Icons/EmailAndContactsScraper.svg";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ToolsSection() {
  interface ToolType {
    title: string;
    desc: string;
    image: any;
  }
  const toolsList: ToolType[] = [
    {
      title: "Google Maps Scraper",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: GoogleMapsScraperImage,
    },
    {
      title: "Email And Contacts Scraper",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: EmailAndContactsScraperImage,
    },
    {
      title: "Email Address Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: EmailAddressValidatorImage,
    },
    {
      title: "Phone Number Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: PhoneNumberValidatorImage,
    },
    {
      title: "WhatsApp Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: WhatsAppValidatorImage,
    },
  ];
  const Tool = ({ tool }: { tool: ToolType }) => {
    return (
      <Stack alignItems="center" gap="1.4375rem" maxWidth="15em">
        <Image src={tool.image} alt={tool.title} />
        <h3>{tool.title}</h3>
        <Typography textAlign="center" width="25ch">
          {tool.desc} <Link href="/">Learn More...</Link>
        </Typography>
      </Stack>
    );
  };
  return (
    <>
      <h2>
        If you want <span>even more</span> leads
        <br />
        Use our other <span>Tools</span> like!
      </h2>
      <Stack
        direction="row"
        gap="4.375rem"
        maxWidth="70vw"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        {toolsList.map((tool) => (
          <Tool tool={tool} key={tool.title} />
        ))}
      </Stack>
    </>
  );
}
