/* eslint-disable @typescript-eslint/naming-convention */
import { createMuiTheme } from '@material-ui/core'

import { AvailableDesigns, AvailablePalettes, DesignMap, PaletteMap } from './available.theme'
import { Theme } from '@cenk1cenk2/react-template-base'

export const generateTheme = (options: { palette: AvailablePalettes, design: AvailableDesigns, fonts?: { header?: string, normal?: string } }): Theme => {
  const palette = PaletteMap[options.palette]
  const design = DesignMap[options.design]

  // inject default fonts
  options.fonts = {
    header: options.fonts?.normal ?? 'Roboto',
    normal: 'Frank Ruhl Libre',
    ...options.fonts
  }

  return {
    ...createMuiTheme({
      palette,
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 960,
          lg: 1280,
          xl: 1920
        }
      },
      typography: {
        fontSize: 16,
        // htmlFontSize: 16,
        fontFamily: [ options.fonts.normal ].join(','),
        h1: {
          fontFamily: options.fonts.header,
          fontWeight: 700,
          fontSize: '3.5rem'
        },
        h2: {
          fontFamily: options.fonts.header,
          fontWeight: 700,
          fontSize: '2.75rem'
        },
        h3: {
          fontFamily: options.fonts.header,
          fontWeight: 700,
          fontSize: '2.225rem'
        },
        h4: {
          fontFamily: options.fonts.header,
          fontWeight: 500,
          fontSize: '2rem'
        },
        h5: {
          fontWeight: 500,
          fontSize: '1.75rem'
        },
        h6: {
          fontSize: '1.5rem',
          fontWeight: 500
        },
        subtitle1: {
          fontSize: '1.35rem'
        },
        subtitle2: {
          fontSize: '1.25rem',
          fontWeight: 500
        }
      },
      overrides: {
        MuiToolbar: {
          regular: {
            background: 'transperent'
          }
        },
        MuiTableCell: {
          root: {
            padding: 12,
            fontSize: 12
          },
          paddingCheckbox: {
            paddingLeft: 4,
            paddingRight: 4
          },
          head: {
            color: palette.grey[600],
            textTransform: 'uppercase',
            fontSize: 12
          }
        },
        MuiFormLabel: {
          root: {}
        },
        MuiSvgIcon: {
          fontSizeSmall: {
            fontSize: 16
          }
        },
        MuiButton: {}
      },
      mixins: {
        toolbar: {
          minHeight: design.header.headerSizeMin,
          background: palette.background.paper
        }
      },
      shape: {
        borderRadius: 0
      }
    }),
    design
  }
}
