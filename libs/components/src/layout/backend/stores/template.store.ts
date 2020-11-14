import { atom, useRecoilState } from 'recoil'

import { DashboardTemplateActions, DashboardTemplateNavStates, DashboardTemplateNavTypes, DashboardTemplateProps } from '../index.interface'

export const BackendTemplateStore = atom<DashboardTemplateProps>({
  key: 'BackendTemplateStore',
  default: {
    header: {
      transperent: true
    },
    narrow: true,
    navigation: {
      type: DashboardTemplateNavTypes.header,
      collapsable: true
    }
  }
})

export const BackendTemplateReducer = (action: DashboardTemplateActions): void => {
  const [ state, setState ] = useRecoilState(BackendTemplateStore)

  if (action === DashboardTemplateActions['navigation:close']) {
    // navigation close action
    setState({ navigation: { state: DashboardTemplateNavStates.close } })
  } else if (action === DashboardTemplateActions['navigation:open']) {
    // set state
    setState({ navigation: { state: DashboardTemplateNavStates.open } })
  } else if (action === DashboardTemplateActions['navigation:toggle']) {
    if ([ DashboardTemplateNavStates.overlay, DashboardTemplateNavStates.open, DashboardTemplateNavStates.collapse ].includes(state.navigation.state)) {
      setState({ navigation: { state: DashboardTemplateNavStates.close } })
    } else {
      setState({ navigation: { state: DashboardTemplateNavStates.open } })
    }
  } else if (action === DashboardTemplateActions['navigation:mouseEnter']) {
    setState({ navigation: { state: DashboardTemplateNavStates.open, mouse: true } })
  } else if (action === DashboardTemplateActions['navigation:mouseLeave']) {
    setState({ navigation: { mouse: false } })
  }
}
