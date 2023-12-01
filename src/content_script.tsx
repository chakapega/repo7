import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { Provider, useDispatch } from 'react-redux'

import { store } from './store'
import { useAppSelector } from "./hooks"
import { toggleSettingsView } from "./contentScriptSlice"
import { SettingNames } from "./types"
import { getSettingValue, getSettingCardIconUrl, getSettingsDivSelector, getSettingsButtonSelector } from "./helpers"

import './content_script.css'

const settingsIcon = chrome.runtime.getURL('../assets/6002fa9051c2ec00048c6c7a.png')

const SettingsButton = () => {
  const isSettingsViewVisible = useAppSelector((state) => state.contentScript.isSettingsViewVisible)
  const dispatch = useDispatch()

  return (
    <div className={isSettingsViewVisible ? "settings-button-wrapper settings-button-wrapper_opened" : "settings-button-wrapper"}>
      <button className="settings-button" type="button" onClick={() => dispatch(toggleSettingsView())}>
        <img className="settings-button-icon" src={settingsIcon} alt="Settings button icon" />
      </button>
    </div>
  )
}

const SettingsView = () => {
  const isSettingsViewVisible = useAppSelector((state) => state.contentScript.isSettingsViewVisible)
  const [densitySettingValue, setDensitySettingValue] = useState<string>()
  const [inboxTypeSettingValue, setInboxTypeSettingValue] = useState<string>()
  const [readingPaneSettingValue, setReadingPaneSettingValue] = useState<string>()
  const [areGmailSettingVisible, setAreGmailSettingVisible] = useState<boolean>()
  const [gmailSettingsButton, setGmailSettingsButton] = useState<HTMLElement>()

  useEffect(() => {
    updateValueStates()
    setAreGmailSettingVisible(!!document.querySelector(getSettingsDivSelector()))

    setTimeout(() => {
      const gmailSettingsButton = document.querySelector(getSettingsButtonSelector()) as HTMLElement
      setGmailSettingsButton(gmailSettingsButton)
      gmailSettingsButton?.addEventListener('click', () => {
        if (!!document.querySelector(getSettingsDivSelector())) {
          updateValueStates()
        }
      })
    }, 333)
  }, [])

  const updateValueStates = () => {
    setDensitySettingValue(getSettingValue(SettingNames.Density))
    setInboxTypeSettingValue(getSettingValue(SettingNames.InboxType))
    setReadingPaneSettingValue(getSettingValue(SettingNames.ReadingPane))
  }

  const toggleGmailSettingsButton = () => {
    if (gmailSettingsButton) {
      if (!!document.querySelector(getSettingsDivSelector())) {
        updateValueStates()
      }

      gmailSettingsButton.click()

      setTimeout(() => {
        setAreGmailSettingVisible(!!document.querySelector(getSettingsDivSelector()))
      }, 333)
    }
  }

  return (
    <div className={isSettingsViewVisible ? "settings-view-wrapper" : "settings-view-wrapper settings-view-wrapper_hidden"}>
      <div className="settings-view-header"></div>
      <div className={isSettingsViewVisible ? "settings-view-content-wrapper" : "settings-view-content-wrapper settings-view-content-wrapper_hidden"}>
        <div className="settings-view-cards-wrapper">
          {densitySettingValue && <SettingCard settingName={SettingNames.Density} settingValue={densitySettingValue} />}
          {inboxTypeSettingValue && <SettingCard settingName={SettingNames.InboxType} settingValue={inboxTypeSettingValue} />}
          {readingPaneSettingValue && <SettingCard settingName={SettingNames.ReadingPane} settingValue={readingPaneSettingValue} />}
        </div>
        <span className="settings-view-text">Current Gmail Layout</span>
      </div>
      <button className={isSettingsViewVisible ? "settings-view-button" : "settings-view-button settings-view-button_hidden"} onClick={toggleGmailSettingsButton}>
          {areGmailSettingVisible ? 'Close Settings' : 'Open Settings'}
      </button>
    </div>
  )
}

interface SettingCardProps {
  settingName: SettingNames;
  settingValue: string;
}

const SettingCard = ({ settingName, settingValue }: SettingCardProps) => {
  const iconUrl = getSettingCardIconUrl(settingName, settingValue)

  return (
    <div className="setting-card-wrapper">
      <span className="setting-card-name">{settingName}</span>
      <img src={iconUrl} alt="Setting option icon" />
      <span className="setting-card-value">{settingValue}</span>
    </div>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SettingsButton />
      <SettingsView />
    </Provider>
  </React.StrictMode>
)
