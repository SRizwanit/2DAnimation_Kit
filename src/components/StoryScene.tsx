import React from "react";
import { AbsoluteFill } from "remotion";
import { Scene } from "../types";
import { Background } from "./Background";
import { Caption } from "./Caption";
import { Tag } from "./Tag";

export const StoryScene: React.FC<{ scene: Scene; frames: number }> = ({ scene, frames }) => (
  <AbsoluteFill>
    <Background theme={scene.theme} figure={scene.figure} frames={frames} />
    <Tag text="গল্পের বর্ণনা" tone="story" />
    {scene.narration ? <Caption text={scene.narration} seconds={scene.seconds} /> : null}
  </AbsoluteFill>
);
