import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../../app/store'

export interface darkModeState {
  darkMode: boolean
}

const initialState = {
  darkMode:
    JSON.parse(window.localStorage.getItem('darkMode') as string) || false,
} as darkModeState

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      window.localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
    },
  },
})

export const { toggleDarkMode } = darkModeSlice.actions
export const selectDarkMode = (state: RootState) => state.darkMode
export default darkModeSlice.reducer
