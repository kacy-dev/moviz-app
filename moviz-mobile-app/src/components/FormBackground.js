// FormBackground.js
import React from "react";
import {
  Svg,
  G,
  Mask,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeBlend,
  FeTurbulence,
  FeColorMatrix,
  FeComponentTransfer,
  FeFuncA,
  FeComposite,
  FeMerge,
  FeMergeNode,
  Rect
} from "react-native-svg";

export default function FormBackground(props) {
  return (
    <Svg
      width={402}
      height={717}
      viewBox="0 0 402 717"
      fill="none"
      {...props} // lets you pass style or dimensions
    >
      <G filter="url(#filter0_n_555_1219)">
        <Mask id="path-1-inside-1_555_1219" fill="white">
          <Path d="M0 32C0 14.3269 14.3269 0 32 0H370C387.673 0 402 14.3269 402 32V719C402 736.673 387.673 751 370 751H32C14.3269 751 0 736.673 0 719V32Z"/>
        </Mask>
        <Path d="M0 32C0 14.3269 14.3269 0 32 0H370C387.673 0 402 14.3269 402 32V719C402 736.673 387.673 751 370 751H32C14.3269 751 0 736.673 0 719V32Z" fill="#121212"/>
        <Path d="M0 32C0 13.7746 14.7746 -1 33 -1H369C387.225 -1 402 13.7746 402 32C402 14.8792 387.673 1 370 1H32C14.3269 1 0 14.8792 0 32ZM402 751H0H402ZM0 751V0V751ZM402 0V751V0Z" fill="#6A0DAD" mask="url(#path-1-inside-1_555_1219)"/>
      </G>
      <Defs>
        <Filter id="filter0_n_555_1219" x="0" y="0" width="402" height="751" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <FeTurbulence type="fractalNoise" baseFrequency="0.23809525 0.23809525" stitchTiles="stitch" numOctaves="3" result="noise" seed="4635"/>
          <FeColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
          <FeComponentTransfer in="alphaNoise" result="coloredNoise1">
            <FeFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
          </FeComponentTransfer>
          <FeComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped"/>
          <FeFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood"/>
          <FeComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1"/>
          <FeMerge result="effect1_noise_555_1219">
            <FeMergeNode in="shape"/>
            <FeMergeNode in="color1"/>
          </FeMerge>
        </Filter>
      </Defs>
    </Svg>
  );
}
