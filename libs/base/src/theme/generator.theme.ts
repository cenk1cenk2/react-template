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
          md: 960,
          lg: 1280,
          xl: 1920
        }
      },
      typography: {
        fontSize: 16,
        // htmlFontSize: 16,
        fontFamily: [ 'Varela', 'Roboto' ].join(','),
        h1: {
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '3.5rem'
        },
        h2: {
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '2.75rem'
        },
        h3: {
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '2.225rem'
        },
        h4: {
          fontFamily: 'Roboto',
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
