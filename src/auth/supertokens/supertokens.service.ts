import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import { SMTPService } from 'supertokens-node/recipe/emailpassword/emaildelivery';
import EmailVerification from "supertokens-node/recipe/emailverification"

import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';

@Injectable()
export class SupertokensService {
  constructor(@Inject(ConfigInjectionToken) private config: AuthModuleConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          emailDelivery: {
            override: (originalImplementation) => {
              return {
                ...originalImplementation,
                sendEmail: async function (input) {
                  if (input.type === 'PASSWORD_RESET') {
                    // You can change the path, domain of the reset password link,
                    // or even deep link it to your mobile app
                    return originalImplementation.sendEmail({
                      ...input,
                      passwordResetLink: input.passwordResetLink.replace(
                        // This is: `${websiteDomain}${websiteBasePath}/reset-password`
                        'http://localhost:5000/auth/reset-password',
                        'http://localhost:5000/your/path',
                      ),
                    });
                  }
                  return originalImplementation.sendEmail(input);
                },
              };
            },
          },
        }),
        EmailVerification.init({ mode: 'REQUIRED' }),
        Session.init(),
        Dashboard.init(),
        UserRoles.init(),
      ],
    });
  }
}
