import bunyan from 'bunyan';
import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public TOKEN_EXPIRY: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public SENDGRID_API_KEY: string | undefined;
  public SENDGRID_SENDER: string | undefined;
  public EC2_URL: string | undefined;
  public AWS_COGNITO_SECRET_HASH: string;
  public AWS_COGNITO_APP_CLIENT_ID: string;
  public SESSION_KEY: string;
  public OKTA_CLIENT_ID: string;
  public OKTA_REDIRECT_URI: string;
  public OKTA_ISSUER: string;
  public SERVER_URL: string;
  public OKTA_CLIENT_SECRET: string;
  public JAVA_SERVER_BASER_URL: string;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '3001';
    this.SERVER_URL = process.env.SERVER_URL || '4000';
    this.TOKEN_EXPIRY = process.env.TOKEN_EXPIRY || '';
    this.AWS_COGNITO_SECRET_HASH = process.env.AWS_COGNITO_SECRET_HASH || '';
    this.AWS_COGNITO_APP_CLIENT_ID = process.env.AWS_COGNITO_APP_CLIENT_ID || '';
    this.SESSION_KEY = process.env.SESSION_KEY || '';
    this.OKTA_CLIENT_ID = process.env.OKTA_CLIENT_ID || '';
    this.OKTA_REDIRECT_URI = process.env.OKTA_REDIRECT_URI || '';
    this.OKTA_ISSUER = process.env.OKTA_ISSUER || '';
    this.OKTA_CLIENT_SECRET = process.env.OKTA_CLIENT_SECRET || '';
    this.JAVA_SERVER_BASER_URL = process.env.JAVA_SERVER_BASER_URL || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    // manual validation
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
