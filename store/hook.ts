import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {RootState, store} from './store'


/* Setup Redux Hooks */
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
