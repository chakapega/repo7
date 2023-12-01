import { configureStore } from '@reduxjs/toolkit'
import contentScriptReducer from './contentScriptSlice'

export const store = configureStore({
  reducer: {
    contentScript: contentScriptReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch