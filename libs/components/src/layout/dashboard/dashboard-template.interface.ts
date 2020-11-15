/* eslint-disable no-undef */

import { MaxWidths } from '../../interfaces/max-width.interface'

export interface DashboardTemplateProps {
  maxWidth?: MaxWidths
  header?: {
    transperent?: boolean
  }
  navigation?: {
    collapsable?: boolean
    type?: DashboardTemplateNavTypes
  }
  items?: DashboardTemplateNavItems[]
}

export interface DashboardTemplateNavItems {
  icon?: JSX.Element
  name?: string
  url?: string
}

export enum DashboardTemplateNavStates {
  OPEN = 'open',
  OVERLAY = 'overlay',
  CLOSE = 'close',
  COLLAPSE = 'collapse'
}

export enum DashboardTemplateNavTypes {
  HEADER = 'header',
  MENU = 'menu',
  OFF = 'off'
}

export enum DashboardTemplateActions {
  'navigation:toggle',
  'navigation:open',
  'navigation:close',
  'navigation:mouseEnter',
  'navigation:mouseLeave'
}
