import * as AWS from 'aws-sdk';
import crypto from 'crypto';
import { config } from '@root/config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('awsCognitoService');

export class Cognito {
  private readonly cognitoIdentity;
  private clientId: string = config.AWS_COGNITO_APP_CLIENT_ID;
  private secretHash = config.AWS_COGNITO_SECRET_HASH;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider({
      region: 'eu-west-3'
    });
  }

  public async signUp(email_address: string, password: string): Promise<void> {
    const signUpParams = {
      ClientId: this.clientId,
      Password: password || 'r3fcrfrf',
      Username: email_address || 'benjitestingOne@yahoo.com',
      UserAttributes: []
    };

    try {
      const returned_signup_data = await this.cognitoIdentity.signUp(signUpParams).promise();
      log.info(returned_signup_data, 'returned_signup_data');
    } catch (error: unknown) {
      throw new Error(`Failed to sign up: ${error}`);
    }
  }

  public async login(email_address: string, password: string): Promise<boolean> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email_address,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(email_address)
      }
    };

    try {
      const response = await this.cognitoIdentity.initiateAuth(params).promise();
      log.info(response);
      return true;
    } catch (error: unknown) {
      log.error(error);
      return false;
    }
  }

  public async confirmSignUp(username: string, code: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username)
    };

    try {
      const cognitoResp = await this.cognitoIdentity.confirmSignUp(params).promise();
      log.info(cognitoResp);
      return true;
    } catch (error) {
      log.info('error', error);
      return false;
    }
  }

  private hashSecret(username: string): string {
    return crypto
      .createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64');
  }

  public async forgotPassword(username: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      Username: username,
      SecretHash: this.hashSecret(username)
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      return true;
    } catch (error) {
      log.info(error);
      return false;
    }
  }

  public async confirmNewPassword(username: string, password: string, code: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username)
    };

    try {
      const data = await this.cognitoIdentity.confirmForgotPassword(params).promise();
      log.info(data);
      return true;
    } catch (error) {
      log.info(error);
      return false;
    }
  }
}
