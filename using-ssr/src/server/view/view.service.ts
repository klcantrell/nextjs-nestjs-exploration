import { Injectable, OnModuleInit } from '@nestjs/common';
import createServer from 'next';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({
        dev: process.env.NODE_ENV !== 'production',
        dir:
          process.env.NODE_ENV !== 'production'
            ? './src/client'
            : './dist/client',
      });
      await this.server.prepare();
    } catch (error) {
      console.error(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
