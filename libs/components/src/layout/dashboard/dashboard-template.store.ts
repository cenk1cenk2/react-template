import { atom, selector } from 'recoil'

import { DashboardTemplateActions, DashboardTemplateNavStates, DashboardTemplateNavTypes } from './dashboard-template.interface'

export const DashboardTemplateNavTypeStore = atom<DashboardTemplateNavTypes>({
  key: 'dashboardTemplateNavType',
  default: DashboardTemplateNavTypes.MENU
})

interface DashboardTemplateNavStatesStoreInterface {
  state: DashboardTemplateNavStates
  mouse?: boolean
}

export const DashboardTemplateNavStatesStore = atom<DashboardTemplateNavStatesStoreInterface>({
  key: 'dashboardTemplateNavState',
  default: { state: DashboardTemplateNavStates.OPEN, mouse: false }
})

export const DashboardTemplateNavStatesReducer = selector<DashboardTemplateNavStatesStoreInterface, DashboardTemplateActions>({
  key: 'dashboardTemplateNavStateSelector',
  get: ({ get }) => {
    return get(DashboardTemplateNavStatesStore)
  },
  set: ({ set }, action) => {
    set(DashboardTemplateNavStatesStore, (prev) => {
      console.log(action, prev)
      if (action === DashboardTemplateActions['navigation:close']) {
        return { state: DashboardTemplateNavStates.CLOSE }
      } else if (action === DashboardTemplateActions['navigation:open']) {
        return { state: DashboardTemplateNavStates.OPEN }
      } else if (action === DashboardTemplateActions['navigation:toggle']) {
        if ([ DashboardTemplateNavStates.OVERLAY, DashboardTemplateNavStates.OPEN, DashboardTemplateNavStates.COLLAPSE ].includes(prev.state)) {
          return { state: DashboardTemplateNavStates.CLOSE }
        } else {
          return { state: DashboardTemplateNavStates.OPEN }
        }
      } else if (action === DashboardTemplateActions['navigation:mouseEnter'] && prev.state === DashboardTemplateNavStates.COLLAPSE) {
        return { state: DashboardTemplateNavStates.OPEN, mouse: true }
      } else if (action === DashboardTemplateActions['navigation:mouseLeave'] && prev.mouse === true) {
        return {
          ...prev,
          mouse: false,
          state: DashboardTemplateNavStates.COLLAPSE
        }
      } else {
        return prev
      }
    })
  }
})
