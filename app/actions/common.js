
import {
  Platform,
  InteractionManager,
} from 'react-native';
import {
  APP_NAME,
  APP_IDENTIFIER_IOS,
  APP_IDENTIFIER_ANDROID
} from '../env';
import Parse from 'parse/react-native';

export const LOADED_CONFIG = 'LOADED_CONFIG';

export async function loadConfig() {
  const config = await Parse.Config.get();
  await InteractionManager.runAfterInteractions();
  return {
    type: LOADED_CONFIG,
    config,
  };
}

export async function currentInstallation() {
  const installationId = await Parse._getInstallationId();
  return new Parse.Installation({
    installationId,
    APP_NAME,
    deviceType: Platform.OS,
    // TODO: Get this information from the app itself
    appIdentifier: Platform.OS === 'ios' ? APP_IDENTIFIER_IOS : APP_IDENTIFIER_ANDROID,
  });
}

export async function updateInstallation(updates) {
  const installation = await currentInstallation();
  await installation.save(updates);
}

export const SWITCH_TAB = 'SWITCH_TAB';

export function switchTab(tab) {
  return {
    type: 'SWITCH_TAB',
    tab,
  };
}
