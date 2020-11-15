import { Theme as BaseTheme } from '@material-ui/core/styles'

export interface Theme extends BaseTheme {
  design: {
    header: {
      headerSizeMin: number
      logoFieldWidth: number
    }
    navigation: {
      width: number
      collapseWidth: number
    }
  }
}
