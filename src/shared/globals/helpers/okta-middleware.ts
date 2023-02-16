import { ExpressOIDC } from '@okta/oidc-middleware';
import { config } from '@root/config';

//Setting up okta middleware
const oidc = new ExpressOIDC({
  issuer: config.OKTA_ISSUER,
  client_id: config.OKTA_CLIENT_ID,
  client_secret: config.OKTA_CLIENT_ID,
  appBaseUrl: config.SERVER_URL,
  scope: 'openid profile'
});

const oktaMiddleware = oidc.ensureAuthenticated();

export { oidc, oktaMiddleware };
