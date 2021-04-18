// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
//   database: {
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT, 10) || 5432
//   }
// });

import {ConfigFactory} from "../util/configFactory";

class Settings extends ConfigFactory {
  constructor(config: any) {
    super(config, () => 'release');
  }
  readonly version: string = this.extract('version')
  readonly baseUrl: string = this.extract('baseUrl')
  readonly dbHost: string = this.extract('dbHost')
  readonly dbPort: string = this.extract('dbPort')
}

export let settings = new Settings({})

export const loadSettings = () => {
  settings = new Settings({
    version: '1.0.0',
    baseUrl: {
      local: 'http://127.0.0.1:11353/api',
      development: 'https://dev.mp.hswl007.com/api',
      release: 'https://mp.hswl007.com/api'
    },
    dbHost: process.env.DATABASE_HOST,
    dbPort: parseInt(process.env.DATABASE_PORT, 10) || 5432
  });
  console.info('settings', settings)
  return settings
}
