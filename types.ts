export enum ViewState {
  HOME = 'HOME',
  GALLERY = 'GALLERY', // Printable images
  VIDEOS = 'VIDEOS',   // Tutorials
  PARENTS = 'PARENTS'  // Guide for parents
}

export type ArtMode = 'COLORING' | 'REFERENCE';

export type ArtStyle = 'LINE_ART' | 'MARKER' | 'WATERCOLOR' | 'CRAYON' | 'SIMPLE';

export interface ColoringPage {
  id: string;
  url: string;
  prompt: string;
  mode: ArtMode;
  style: ArtStyle;
  createdAt: number;
}

export interface VideoTutorial {
  id: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
  duration: string;
}

export interface ParentingTip {
  title: string;
  content: string;
  category: 'psychology' | 'technique' | 'activity';
}