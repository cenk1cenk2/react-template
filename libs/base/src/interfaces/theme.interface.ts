import { Theme as BaseTheme } from '@material-ui/core/styles'
import { ColorProperty, MinWidthProperty, WidthProperty } from 'csstype'

export interface Theme extends BaseTheme {
  design: {
    body: {
      0: ColorProperty
      1: ColorProperty
      2: ColorProperty
    }
    header: {
      headerSizeMin: MinWidthProperty<string>
      logoFieldWidth: WidthProperty<string>
    }
    navigation: {
      width: WidthProperty<string>
      collapseWidth: WidthProperty<string>
    }
  }
}
