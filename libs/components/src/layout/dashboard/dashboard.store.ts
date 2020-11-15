import { atom, selector } from 'recoil'

import { DashboardTemplateActions, DashboardTemplateNavStates, DashboardTemplateNavTypes } from './dashboard.interface'

export const DashboardLoaded = atom<boolean>({
  key: 'dashboardTemplateNavLoaded',
  default: false
})

export const NavTypeStore = atom<DashboardTemplateNavTypes>({
  key: 'dashboardTemplateNavType',
  default: DashboardTemplateNavTypes.MENU
})

interface NavStatesStoreType {
  state: DashboardTemplateNavStates
  mouse?: boolean
}

export const NavStatesStore = atom<NavStatesStoreType>({
  key: 'dashboardTemplateNavState',
  default: { state: DashboardTemplateNavStates.OPEN, mouse: false }
})

export const NavStatesReducer = selector<NavStatesStoreType, DashboardTemplateActions>({
  key: 'dashboardTemplateNavStateSelector',
  get: ({ get }) => {
    return get(NavStatesStore)
  },
  set: ({ set }, action) => {
    set(NavStatesStore, (prev) => {
      console.debug('run-reducer: NavStatesReducer', 'prev:', prev)

      if (action === DashboardTemplateActions['navigation:close']) {
        console.debug('Closing drawer.')

        return { state: DashboardTemplateNavStates.CLOSE }
      } else if (action === DashboardTemplateActions['navigation:open']) {
        console.debug('Opening drawer.')

        return { state: DashboardTemplateNavStates.OPEN }
      } else if (action === DashboardTemplateActions['navigation:toggle']) {
        if (prev?.mouse === true && prev.state === DashboardTemplateNavStates.OPEN) {
          console.debug('Toggling drawer. Last state has opened by mouseover, will collapse.')

          return { state: DashboardTemplateNavStates.COLLAPSE }
        } else if ([ DashboardTemplateNavStates.OVERLAY, DashboardTemplateNavStates.OPEN ].includes(prev?.state)) {
          console.debug('Toggling drawer. Will close.')

          return { state: DashboardTemplateNavStates.CLOSE }
        } else {
          console.debug('Toggling drawer. Will open.')

          return { state: DashboardTemplateNavStates.OPEN }
        }
      } else if (action === DashboardTemplateActions['navigation:mouseEnter'] && prev?.state === DashboardTemplateNavStates.COLLAPSE) {
        console.debug('Opening drawer with mouseover.')

        return { state: DashboardTemplateNavStates.OPEN, mouse: true }
      } else if (action === DashboardTemplateActions['navigation:mouseLeave'] && prev?.mouse === true) {
        console.debug('Collapsing drawer with mouseout.')

        return {
          ...prev,
          mouse: false,
          state: DashboardTemplateNavStates.COLLAPSE
        }
      }
    })
  }
})
