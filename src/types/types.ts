import { Key } from "react";

export interface Slide {
  [x: string]: Key | null | undefined;
  text: string;
  imagePosition: 'left' | 'right' | 'top';
  thumbnail?: string;
  backgroundImage?: string;
}