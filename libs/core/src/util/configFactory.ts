function extract(config: any, env: string, key: string) {
  const value = config[key];
  if (value) {
    if (typeof value === 'object') {
      const envValue = value[env];
      if (envValue) {
        return envValue;
      } else {
        console.warn(`config undefined: ${key}`)
        return undefined;
      }
    } else {
      return value;
    }
  } else {
    console.warn(`config undefined: ${key}`)
    return undefined;
  }
}

export class ConfigFactory {
  private readonly config: any;
  constructor(config: any, getEnv: () => string) {
    this.config = config;
    this.env = getEnv();
  }

  extract = (key: string) => extract(this.config, this.env, key)
  readonly env: string;
}
