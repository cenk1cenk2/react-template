/* eslint-disable @typescript-eslint/naming-convention */
import { Theme } from '@cenk1cenk2/react-template-base'
import { createMuiTheme } from '@material-ui/core'

import { AvailableDesigns, AvailablePalettes, DesignMap, PaletteMap } from './available.theme'

export const generateTheme = (options: { palette: AvailablePalettes, design: AvailableDesigns }): Theme => {
  const palette = PaletteMap[options.palette]
  const design = DesignMap[options.design]

  return {
    ...createMuiTheme({
      palette,
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 940,
          lg: 1080,
          xl: 1440
        }
      },
      typography: {
        fontFamily: [ 'Varela' ].join(','),
        h1: {
          fontFace: 'Roboto',
          fontWeight: 700,
          fontSize: '2.25rem'
        },
        h2: {
          fontFace: 'Roboto',
          fontWeight: 600,
          fontSize: '1.75rem'
        },
        h3: {
          fontFace: 'Roboto',
          fontWeight: 600,
          fontSize: '1.4rem'
        },
        h4: {
          fontWeight: 400,
          fontSize: '1.2rem'
        },
        h5: {
          fontWeight: 400,
          fontSize: '1rem'
        },
        h6: {
          fontSize: '0.925rem',
          fontWeight: 400,
          color: palette.grey[600]
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
