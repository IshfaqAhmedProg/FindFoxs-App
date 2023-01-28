import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const Hero = () => {
  return (
    <div style={{ width: "60ch", height: "20ch" }} className={inter.className}>
      <TypeAnimation
        cursor={false}
        sequence={[
          "Search Leads...",
          2000,
          "Engage with potential customers...",
          2000,
          "Use state of the art tools like - ",
          700,
          "Use state of the art tools like - Email Validators",
          1000,
          "Use state of the art tools like - Phone Number Validators",
          1000,
          "Use state of the art tools like - Google Maps Scraper",
          1000,
          "Use state of the art tools like - and more...",
          2000,
          "Get the most out of your potential client!",
          2000,
        ]}
        speed={70}
        deletionSpeed={99}
        wrapper="h1"
        repeat={Infinity}
      />
    </div>
  );
};
