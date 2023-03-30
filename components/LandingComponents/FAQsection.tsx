import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreRounded";
export default function FAQsection() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const faq = [
    {
      id: "faq1",
      question: "What is scraping?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus autem nobis soluta rem porro nostrum maiores? Non ut assumenda accusamus hic ipsa saepe nemo.",
    },
    {
      id: "faq2",
      question: "Is it legal to scrape data?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus autem nobis soluta rem porro nostrum maiores? Non ut assumenda accusamus hic ipsa saepe nemo.",
    },
    {
      id: "faq3",
      question: "How much does it cost?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus autem nobis soluta rem porro nostrum maiores? Non ut assumenda accusamus hic ipsa saepe nemo.",
    },
    {
      id: "faq4",
      question: "What is Free Tier?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores doloribus autem nobis soluta rem porro nostrum maiores? Non ut assumenda accusamus hic ipsa saepe nemo.",
    },
  ];
  return (
    <>
      <h2>
        Frequently Asked
        <br />
        <span>Questions</span>
      </h2>
      <Stack maxWidth="60vw" gap=".875rem">
        {faq.map((element) => {
          return (
            <Accordion
              key={element.id}
              expanded={expanded === element.id}
              onChange={handleChange(element.id)}
              sx={{
                borderRadius: "var(--border-radius)",
                padding: "1rem 1.5rem",
                boxShadow: "var(--box-shadow)",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "var(--accent)" }} />}
                aria-controls={element.id + "-content"}
                id={element.id + "-header"}
              >
                <Typography
                  sx={{ width: "33%", flexShrink: 0 }}
                  color="primary"
                >
                  {element.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{ fontSize: "0.8em", color: "var(--primarylight)" }}
                  variant="body1"
                >
                  {element.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Stack>
    </>
  );
}
