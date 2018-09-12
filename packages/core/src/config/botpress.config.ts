export type DatabaseType = 'postgres' | 'sqlite'

export type BotpressCondition = '$isProduction' | '$isDevelopment'

export interface DatabaseConfig {
  migrations?: string
  type: DatabaseType
  url?: string
  location?: string
  host?: string
  port?: number
  user?: string
  password?: string
  ssl?: boolean
  database?: string
}

export type BotpressConfig = {
  httpServer: {
    host?: string
    port: number
    backlog: number
    bodyLimit: string | number
  }
  database: DatabaseConfig
  /**
   * @description Testing comments
   */
  ghost: {
    enabled: boolean | BotpressCondition
  }
}
