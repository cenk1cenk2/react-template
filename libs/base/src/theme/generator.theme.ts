/* eslint-disable @typescript-eslint/naming-convention */
import { Theme } from '@cenk1cenk2/react-template-base/interfaces'
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
          sm: 620,
          md: 940,
          lg: 1200,
          xl: 1980
        }
      },
      typography: {
        fontFamily: [ 'Lato' ].join(','),
        h1: {
          fontFace: 'Roboto'
        },
        h2: {
          fontFace: 'Roboto'
        },
        h3: {
          fontFace: 'Roboto'
        },
        h4: {
          fontSize: '1.125rem',
          fontWeight: 'bold',
          fontFamily: 'Lato'
        },
        h5: {
          fontSize: '1rem',
          fontWeight: 'bold',
          color: palette.grey[700]
        },
        h6: {
          fontSize: '0.875rem',
          fontWeight: 'bold'
        }
      },
      overrides: {
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
        }
      },
      mixins: {
        toolbar: {
          minHeight: design.header.headerSizeMin,
          background: palette.background.paper
        }
      }
    }),
    design
  }
}
