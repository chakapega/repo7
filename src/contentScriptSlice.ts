import { createSlice } from '@reduxjs/toolkit'

interface ConentScriptState {
  isSettingsViewVisible: boolean
}

const initialState: ConentScriptState = {
  isSettingsViewVisible: false,
}

export const contentScriptSlice = createSlice({
  name: 'content-script',
  initialState,
  reducers: {
    toggleSettingsView: (state) => {
      state.isSettingsViewVisible = !state.isSettingsViewVisible
    },
  },
})

export const { toggleSettingsView } = contentScriptSlice.actions

export default contentScriptSlice.reducer