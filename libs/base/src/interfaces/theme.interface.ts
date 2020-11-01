import { Theme as BaseTheme } from '@material-ui/core/styles'
import * as CSS from 'csstype'

export interface Theme extends BaseTheme {
  design: {
    header: {
      headerSizeMin: CSS.Property.MinWidth<string>
      logoFieldWidth: CSS.Property.Width<string>
    }
    navigation: {
      width: CSS.Property.Width<string>
      collapseWidth: CSS.Property.Width<string>
    }
  }
}
