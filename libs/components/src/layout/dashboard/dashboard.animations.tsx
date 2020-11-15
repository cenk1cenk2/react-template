import { css } from 'styled-components'

export enum BackendLayoutAnimations {
  HEADER_TRANSPARENCY,
  DRAWER_COLLAPSE
}

export function backendLayoutAnimations (type: BackendLayoutAnimations, property: string) {
  return {
    [BackendLayoutAnimations.HEADER_TRANSPARENCY]: css`
      transition: ${property} 1.5s ease-in-out;
    `,
    [BackendLayoutAnimations.DRAWER_COLLAPSE]: css`
      transition: ${property} 0.4s ease-in-out;
    `
  }[type]
}
