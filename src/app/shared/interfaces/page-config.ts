import { Font } from './font';
export interface PageConfig {
  title: string;
  metaDescription?: string;
  metaKeyword?: string[];
  metaImage?: string;
  favicon?: string;
  usedFonts?: Font[];
}
