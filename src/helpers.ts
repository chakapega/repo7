import { SettingNames } from "./types"

export function getSettingCardIconUrl(settingName: SettingNames, settingValue: string): string {
  if (settingName === SettingNames.Density) {
    if (settingValue === 'Default') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/displaydensity/Default.png'
    }

    if (settingValue === 'Comfortable') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/displaydensity/Comfortable.png'
    }

    return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/displaydensity/Compact.png'
  }

  if (settingName === SettingNames.InboxType) {
    if (settingValue === 'Default') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/Classic.png'
    }

    if (settingValue === 'Important first') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/Importantfirst.png'
    }

    if (settingValue === 'Unread first') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/Unreadfirst.png'
    }

    if (settingValue === 'Starred first') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/Starredfirst_9194d730ec4fa77e6f8e4edcc7a962b4.png'
    }

    if (settingValue === 'Priority Inbox') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/Priorityinbox.png'
    }

    if (settingValue === 'Multiple Inboxes') {
      return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/inboxtype/MultipleInboxes.png'
    }
  }
  
  if (settingValue === 'No split') {
    return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/previewpane/Previewpaneoff.png'
  }

  if (settingValue === 'Right of inbox') {
    return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/previewpane/Previewpaneright.png'
  }

  return 'https://ssl.gstatic.com/ui/v1/icons/mail/quicksettings/previewpane/Previewpanebottom.png'
}

export function getDensitySettingsSelector(): string {
  return '.Q3[jscontroller="BoAVhd"] .QX [name="PTEbIb"]'
}

export function getInboxTypeSettingsSelector(): string {
  return '.Q3[jscontroller="QPw6E"] .Vn [name="v3knSb"]'
}

export function getReadingPaneSettingsSelector(): string {
  return '.XP[jscontroller="m75MHe"] .XL [name="H1NJAd"]'
}

export function getSettingValue(settingName: SettingNames): string {
  if (settingName === SettingNames.Density) {
    return document.querySelector(`${getDensitySettingsSelector()}[checked]`)?.ariaLabel || 'Default'
  }

  if (settingName === SettingNames.InboxType) {
    return document.querySelector(`${getInboxTypeSettingsSelector()}[checked]`)?.ariaLabel || 'Default'
  }

  return document.querySelector(`${getReadingPaneSettingsSelector()}[checked]`)?.ariaLabel || 'No split'
}

export function getSettingsDivSelector(): string {
  return '.IU'
}

export function getSettingsButtonSelector(): string {
  return '.FI[data-tooltip="Settings"]'
}