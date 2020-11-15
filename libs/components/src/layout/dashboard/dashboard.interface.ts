export interface DashboardTemplateNavItems {
  // eslint-disable-next-line no-undef
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
