import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI:
        'https://st-dev-f1e431e0-9a96-11ee-8ed3-97ea16b16e5e.aws.supertokens.io',
      apiKey: 'mv0U7M4J0WNmzSe1AxQKuNqoBC',
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/emailpassword/appinfo
        appName: 'login',
        apiDomain: 'http://localhost:5000',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
