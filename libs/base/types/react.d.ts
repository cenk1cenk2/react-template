import { BaseProps } from '@cenk1cenk2/react-template-base/interfaces'
import * as BaseReact from 'react'

declare module 'react' {
  interface StyleHTMLAttributes<T> extends BaseReact.HTMLAttributes<T> {
    jsx?: boolean
    global?: boolean
  }
}

declare module '*.svg' {
  export const ReactComponent: BaseReact.FunctionComponent<BaseReact.SVGProps<SVGSVGElement> & { title?: string }>

  export default ReactComponent
}

declare global {
  namespace React {
    // eslint-disable-next-line @typescript-eslint/ban-types
    type EFC<P = {}> = BaseReact.FunctionComponent<P & BaseProps>
  }
}
