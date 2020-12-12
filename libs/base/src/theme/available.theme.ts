import { DefaultDesign } from './design'
import { DarkPalette } from './palette'
import { Theme } from '@cenk1cenk2/react-template-base'

export enum AvailablePalettes {
  'DARK'
}

export const PaletteMap: Record<AvailablePalettes, Theme['palette']> = {
  [AvailablePalettes.DARK]: DarkPalette
}

export enum AvailableDesigns {
  'DEFAULT'
}

export const DesignMap: Record<AvailableDesigns, Theme['design']> = {
  [AvailableDesigns.DEFAULT]: DefaultDesign
}
