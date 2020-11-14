import * as BaseRecoil from 'recoil'

declare module 'recoil' {
  // the custom selector with
  export function selector<T, R = T> (options: BaseRecoil.ReadOnlySelectorOptions<T> & BaseRecoil.ReadWriteSelectorOptions<R>): BaseRecoil.RecoilState<R>
}
