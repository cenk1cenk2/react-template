import { css } from 'styled-components'

export enum BackendLayoutAnimations {
  HEADER_TRANSPARENCY
}

export function backendLayoutAnimations (type: BackendLayoutAnimations, property) {
  return {
    [BackendLayoutAnimations.HEADER_TRANSPARENCY]: css`
      transition: ${property} 0.5s ease-in-out;
    `
  }[type]
}
