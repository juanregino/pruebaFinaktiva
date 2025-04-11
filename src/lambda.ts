import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import * as express from 'express';
import * as cors from 'cors';
import { ExpressAdapter } from '@nestjs/platform-express';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const expressApp = express();

    expressApp.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: false,
        optionsSuccessStatus: 204,
      }),
    );

    expressApp.options('*', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      res.sendStatus(204);
    });

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer(event, context);
};
