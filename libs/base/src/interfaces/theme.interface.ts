import { Theme as BaseTheme } from '@material-ui/core/styles'
import * as CSS from 'csstype'

export interface Theme extends BaseTheme {
  design: {
    header: {
      headerSizeMin: CSS.Property.MinWidth<number>
      logoFieldWidth: CSS.Property.Width<number>
    }
    navigation: {
      width: CSS.Property.Width<number>
      collapseWidth: number
    }
  }
}
