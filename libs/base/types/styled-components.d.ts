import { Theme as BaseTheme } from '@cenk1cenk2/react-template-base/interfaces'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends BaseTheme {}
}
