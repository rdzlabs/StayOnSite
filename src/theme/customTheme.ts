// src/theme/customTheme.ts
import { BrandVariants, Theme, createDarkTheme } from "@fluentui/react-components";

// all 16 brand stops
export const brand: BrandVariants = {
  10:  "#1F1F1F",
  20:  "#0ABAB5",
  30:  "#33CAC9",
  40:  "#FFFFFF",
  50:  "#E6FEFF",
  60:  "#CCFDFF",
  70:  "#B3FCFF",
  80:  "#99FBFF",
  90:  "#80FAFF",
  100: "#66F9FF",
  110: "#4DF8FF",
  120: "#33F7FF",
  130: "#1AF6FF",
  140: "#00F5FF",
  150: "#00C4BE",
  160: "#00938D",
};

export const darkTheme: Theme = {
  ...createDarkTheme(brand),

  colorNeutralBackground1: brand[10], // Actual Background
  colorNeutralBackground2: "#252525", // Box Background

  colorNeutralStroke1: "#F5F5F5", // Outline of all buttons and stuff
  // colorNeutralStroke2: "red", // Dividers
  colorNeutralStroke1Hover: "#F5F5F5", // outline of buttons and field
  colorNeutralStroke1Pressed: "#F5F5F5", // outline of field top
  colorCompoundBrandStroke: "#FFD15D", // Lazer line bpttom of field


  colorNeutralForeground1: "#F5F5F5", // All text
  colorNeutralForeground2: "#F5F5F5", // Info buttons outline
  colorNeutralForeground2Hover: "#FF7058", // Delete Button
  colorNeutralForegroundInverted: "#BDBDBD", // Ball in Switch

  colorCompoundBrandBackground: "#FFD15D", // pill of the switch
  colorCompoundBrandBackgroundHover: "#FFD15D", // pill of the switch as well
  colorCompoundBrandBackgroundPressed: "#FFD15D" // also the pill in switch

};
