import React from "react";
import { Composition, CalculateMetadataFunction, staticFile } from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { HadisStory } from "./HadisStory";
import { HadisProps } from "./types";
import { FPS, INTRO_SECONDS, OUTRO_SECONDS } from "./theme";
import sample from "../data/hadis0000.json";

const defaultProps = { ...(sample as unknown as Omit<HadisProps, "orientation">), orientation: "portrait" } as HadisProps;

export const calculateMetadata: CalculateMetadataFunction<HadisProps> = async ({ props }) => {
  // অডিও থাকলে অডিওর দৈর্ঘ্য অনুযায়ী দৃশ্যের সময় ঠিক হবে
  const scenes = await Promise.all(
    props.scenes.map(async (scene) => {
      if (!scene.audio) return scene;
      try {
        const d = await getAudioDurationInSeconds(staticFile(scene.audio));
        return { ...scene, seconds: Math.ceil((d + 0.5) * 10) / 10 };
      } catch {
        return scene;
      }
    })
  );
  const total = INTRO_SECONDS + OUTRO_SECONDS + scenes.reduce((a, s) => a + s.seconds, 0);
  const portrait = props.orientation !== "landscape";
  return {
    durationInFrames: Math.round(total * FPS),
    width: portrait ? 1080 : 1920,
    height: portrait ? 1920 : 1080,
    props: { ...props, scenes },
  };
};

export const RemotionRoot: React.FC = () => (
  <Composition
    id="HadisStory"
    component={HadisStory}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={FPS * 60}
    defaultProps={defaultProps}
    calculateMetadata={calculateMetadata}
  />
);
