import React from "react";
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { HadisProps, Scene } from "./types";
import { COLORS, FADE_FRAMES, FPS, INTRO_SECONDS, OUTRO_SECONDS } from "./theme";
import { Intro } from "./components/Intro";
import { Outro } from "./components/Outro";
import { StoryScene } from "./components/StoryScene";
import { HadithScene } from "./components/HadithScene";
import { LessonScene } from "./components/LessonScene";
import "./fonts";

const Fade: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, FADE_FRAMES, frames - FADE_FRAMES, frames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const renderScene = (s: Scene, frames: number, meta: Pick<HadisProps, "narrator" | "grade" | "source">) => {
  if (s.kind === "hadith") return <HadithScene scene={s} frames={frames} meta={meta} />;
  if (s.kind === "lesson") return <LessonScene scene={s} frames={frames} />;
  return <StoryScene scene={s} frames={frames} />;
};

export const HadisStory: React.FC<HadisProps> = (props) => {
  
  let cursor = 0;
  const introFrames = INTRO_SECONDS * FPS;
  const outroFrames = OUTRO_SECONDS * FPS;

  const intro = (
    <Sequence from={cursor} durationInFrames={introFrames}>
      <Fade frames={introFrames}>
        <Intro data={props} />
      </Fade>
    </Sequence>
  );
  cursor += introFrames;

  const scenes = props.scenes.map((s) => {
    const frames = Math.round(s.seconds * FPS);
    const el = (
      <Sequence key={s.id} from={cursor} durationInFrames={frames}>
        <Fade frames={frames}>{renderScene(s, frames, props)}</Fade>
        {s.audio ? <Audio src={staticFile(s.audio)} /> : null}
      </Sequence>
    );
    cursor += frames;
    return el;
  });

  const outro = (
    <Sequence from={cursor} durationInFrames={outroFrames}>
      <Fade frames={outroFrames}>
        <Outro data={props} />
      </Fade>
    </Sequence>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {intro}
      {scenes}
      {outro}
      {props.music ? <Audio src={staticFile(props.music)} volume={0.12} loop /> : null}
    </AbsoluteFill>
  );
};
