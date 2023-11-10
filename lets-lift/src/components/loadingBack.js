"use client";
import React, { useCallback } from "react";
import Particles, { ISourceOptions } from "react-tsparticles";
import styles from "@/styles/background.module.css";
import { loadFull } from "tsparticles";
import { loadSlim } from "tsparticles-slim";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";

export const LoadingBackground = ({ children }) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSeaAnemonePreset(engine);

    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          autoPlay: true,
          preset: "seaAnemone",
          background: {
            color: {
              value: "#000000",
            },
            image: "",
            position: "50% 50%",
            repeat: "no-repeat",
            size: "cover",
            opacity: 0
          },
          backgroundMask: {
            composite: "destination-out",
            cover: {
              color: {
                value: "#fff",
              },
              opacity: 1,
            },
            enable: false,
          },
        }}
      />
      {children}
    </>
  );
};
