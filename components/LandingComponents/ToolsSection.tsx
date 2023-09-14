import EmailAddressValidatorImage from "@/public/Icons/EmailAddressValidator.svg";
import EmailAndContactsScraperImage from "@/public/Icons/EmailAndContactsScraper.svg";
import GoogleMapsScraperImage from "@/public/Icons/GoogleMapsScraper.svg";
import PhoneNumberValidatorImage from "@/public/Icons/PhoneNumberValidator.svg";
import WhatsAppValidatorImage from "@/public/Icons/WhatsAppValidator.svg";
import { Stack, Tooltip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

export default function ToolsSection() {
  interface ToolType {
    title: string;
    desc: string;
    image: any;
    delay: number;
  }
  const toolsList: ToolType[] = [
    {
      title: "Google Maps Scraper",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: GoogleMapsScraperImage,
      delay: 0,
    },
    {
      title: "Email And Contacts Scraper",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: EmailAndContactsScraperImage,
      delay: 100,
    },
    {
      title: "Email Address Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: EmailAddressValidatorImage,
      delay: 200,
    },
    {
      title: "Phone Number Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: PhoneNumberValidatorImage,
      delay: 300,
    },
    {
      title: "WhatsApp Validator",
      desc: "Lorem ipsum dolor sit amet consectetur. Eget malesuada urna consequat elit enim in libero elementum vitae.",
      image: WhatsAppValidatorImage,
      delay: 400,
    },
  ];
  const Tool = ({ tool }: { tool: ToolType }) => {
    return (
      <Stack
        alignItems="center"
        gap="1.4375rem"
        maxWidth="17rem"
        p={3}
        boxShadow={"var(--box-shadow)"}
        borderRadius={"var(--border-radius)"}
        data-aos="fade-right"
        data-aos-anchor-placement="top-bottom"
        data-aos-delay={tool.delay}
      >
        <Image src={tool.image} alt={tool.title} />
        <Tooltip title={tool.title}>
          <Typography variant="h4" color="var(--primary)" textAlign={"center"}>
            {tool.title}
          </Typography>
        </Tooltip>
        <Typography textAlign="center" width="25ch">
          {tool.desc} <Link href="/">Learn More...</Link>
        </Typography>
      </Stack>
    );
  };
  return (
    <>
      <h2>
        If you want to <span>refine</span> your leads
        <br />
        We offer other <span>Services</span> like:
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
