export const environment = process.env.NODE_ENV
export const isDebug = environment === "development"
export const isProd = environment === "production"
export const isTesting = environment === "test"
