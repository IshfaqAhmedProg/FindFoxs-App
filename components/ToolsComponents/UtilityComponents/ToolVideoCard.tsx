import Loading from "@/components/CustomComponents/Loading/Loading";
import { Box, Stack } from "@mui/material";
import React, { Suspense } from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function ToolVideo({ videoId }: { videoId: string }) {
  const opts: YouTubeProps["opts"] = {
    height: "320",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  return (
    <Stack
      width={"100%"}
      gap={3}
      alignItems={"center"}
      sx={{
        // on small screen video should be on top
        ["@container (max-width: 720px)"]: {
          gridRowStart: "1",
          pb: 4,
        },
        // background: "red",
      }}
      position={"relative"}
      pt={4}
    >
      <Suspense fallback={<Loading />}>
        <Box
          height={"fit-content"}
          width={"80%"}
          maxWidth={"720px"}
          bgcolor={"var(--graydark)"}
          borderRadius="var(--border-radius)"
          overflow={"hidden"}
        >
          <YouTube videoId={videoId} opts={opts} />
        </Box>
      </Suspense>
    </Stack>
  );
}
