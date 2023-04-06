import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';

import { ViewService } from './view.service';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  handle(req: Request, res: Response): Promise<void> {
    const parsedUrl = parse(req.url, true);
    return this.viewService.getNextServer().getRequestHandler()(
      req,
      res,
      parsedUrl,
    );
  }

  @Get()
  public async showHome(@Req() req: Request, @Res() res: Response) {
    await this.handle(req, res);
  }

  @Get('person/:id')
  public async showPage1(@Req() req: Request, @Res() res: Response) {
    await this.handle(req, res);
  }

  @Get('*.(svg|png)')
  public async sendPublic(@Req() req: Request, @Res() res: Response) {
    await this.handle(req, res);
  }

  @Get('_next*')
  public async sendAssets(@Req() req: Request, @Res() res: Response) {
    await this.handle(req, res);
  }
}
