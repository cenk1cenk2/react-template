import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface DashboardTemplateProps {
  narrow?: boolean
  header?: {
    transperent?: boolean
  }
  navigation?: {
    collapsable?: boolean
    type?: DashboardTemplateNavTypes
    state?: DashboardTemplateNavStates
    mouse?: boolean
  }
  items?: DashboardTemplateNavItems[]
}

export interface DashboardTemplateNavItems {
  icon?: IconDefinition
  name?: string
  url?: string
}

export enum DashboardTemplateNavStates {
  open = 'open',
  overlay = 'overlay',
  close = 'close',
  collapse = 'collapse'
}

export enum DashboardTemplateNavTypes {
  header = 'header',
  menu = 'menu',
  off = 'off'
}

export enum DashboardTemplateActions {
  'navigation:toggle',
  'navigation:open',
  'navigation:close',
  'navigation:mouseEnter',
  'navigation:mouseLeave'
}
