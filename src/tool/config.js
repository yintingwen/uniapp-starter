let appConfig = null

let hookConfig = null

/**
 * 
 * @param {import("../types/config/appConfig").AppConfig} options 
 */
export const defineAppConfig = options => {
  appConfig = options
  return appConfig
}

/**
 * 
 * @param {import("../types/config/page").PageConfig} options 
 */
export const definePageConfig = options => {
  appConfig = options
  return appConfig
}

/**
 * 
 * @param {import("../types/config/hookConfig.js").HookConfig} options 
 */
export const defineHookConfig = options => {
  hookConfig = options
  return hookConfig
}