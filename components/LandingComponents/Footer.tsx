"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Logo from "@/public/Logos/ScrapeFoxLogoVertical.svg";
import Image from "next/image";
import Link from "next/link";
import FacebookLogo from "@/public/Logos/Facebook.svg";
import LinkedInLogo from "@/public/Logos/LinkedIn.svg";
import InstagramLogo from "@/public/Logos/Instagram.svg";
export default function Footer() {
  const thinLinks = { "& > a": { fontWeight: "400" }, fontSize: ".875rem" };
  return (
    <Box
      sx={{ background: "white", boxShadow: "var(--box-shadow)" }}
      width="100%"
      display="flex"
      py="4.25rem"
      alignItems="center"
      justifyContent="space-around"
      flexWrap="wrap"
      gap="4.25rem"
    >
      <Image src={Logo} alt="Visit Scrapefox!" />
      <Stack
        direction="row"
        alignItems="flex-start"
        gap="4.25rem"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Stack my="auto" gap="1rem">
          <Link href="/">Services</Link>
          <Link href="/">Contact Us</Link>
          <Link href="/">FAQ</Link>
        </Stack>
        <Stack alignItems="center" sx={thinLinks} gap="1rem">
          <h4>Tools</h4>
          <Link href="/">Email and Contacts Scraper</Link>
          <Link href="/">Google Maps Scraper</Link>
          <Link href="/">Email Validator</Link>
          <Link href="/">Phone Number Validator</Link>
          <Link href="/">WhatsApp Validator</Link>
        </Stack>
        <Stack alignItems="center" sx={thinLinks} gap="1rem">
          <h4>Leads</h4>
          <Link href="/">Manage Leads</Link>
          <Link href="/">Engage with Leads</Link>
          <Link href="/">Search for New Leads</Link>
        </Stack>
        <Stack alignItems="center" gap="1rem">
          <h4>Contact Us</h4>
          <Typography textAlign="center" sx={thinLinks}>
            7711 Old Mountain Towers,
            <br />
            Nightmute, Ohio,
            <br />
            43498-4451,
            <br />
            {"("}567{")"} 555-6283
          </Typography>
          <Stack direction="row" gap="0.5rem">
            <Link href="/">
              <Image src={FacebookLogo} alt="Facebook Link for scrape fox" />
            </Link>
            <Link href="/">
              <Image src={LinkedInLogo} alt="LinkedIn Link for scrape fox" />
            </Link>
            <Link href="/">
              <Image src={InstagramLogo} alt="Instagram Link for scrape fox" />
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
