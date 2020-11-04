// import { BaseProps } from '@cenk1cenk2/react-template-base'
import * as BaseReact from 'react'

declare module 'react' {
  interface StyleHTMLAttributes<T> extends BaseReact.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}

// declare global {
//   namespace React {
//     // eslint-disable-next-line @typescript-eslint/ban-types
//     type EFC<P = {}> = BaseReact.FunctionComponent<P & BaseProps>
//   }
// }
