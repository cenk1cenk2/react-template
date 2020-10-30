import * as BaseReact from 'react'

import { BaseProps } from '../src/interfaces/base-props.interface'

declare module 'react' {
  interface StyleHTMLAttributes<T> extends BaseReact.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}

declare global {
  namespace React {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type EFC<P = {}> = BaseReact.FunctionComponent<P & BaseProps>
  }
}
