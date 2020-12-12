import { createMuiTheme } from '@material-ui/core'

import { Theme } from '@cenk1cenk2/react-template-base'

const DefaultMuiDarkTheme = createMuiTheme({ palette: { type: 'dark' } })

export const DarkPalette: Theme['palette'] = {
  ...DefaultMuiDarkTheme.palette,
  background: {
    default: '#121212',
    paper: '#1c1c1c'
  },
  common: {
    black: '#000000',
    white: '#efefef'
  },
  primary: {
    main: '#C44330',
    dark: '#832D20',
    light: '#D76B5B',
    contrastText: '#efefef'
  },
  secondary: {
    main: '#32908F',
    light: '#59C5C3',
    dark: '#205B5A',
    contrastText: '#efefef'
  },
  info: {
    main: '#2196f3',
    light: '#bfdcf5',
    dark: '#1976d2',
    contrastText: '#efefef'
  },
  success: {
    main: '#78F029',
    light: '#B7F78D',
    dark: '#2A5F07',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },
  warning: {
    main: '#F0CE5C',
    light: '#ffb74d',
    dark: '#f57c00',
    contrastText: 'rgba(0, 0, 0, 0.87)'
  },
  error: {
    main: '#f44336',
    light: '#e57373',
    dark: '#d32f2f',
    contrastText: '#efefef'
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161'
  },
  text: {
    primary: '#EFEFEF',
    secondary: '#A2A2A2',
    disabled: '#CCCCCC',
    hint: 'rgba(239, 239, 239, 0.38)'
  },
  divider: 'rgba(239, 239, 239, 0.12)'
}
