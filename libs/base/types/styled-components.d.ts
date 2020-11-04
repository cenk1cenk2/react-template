import { Theme as BaseTheme } from '@cenk1cenk2/react-template-base'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends BaseTheme {}
}
