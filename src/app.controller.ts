import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() request: Request, @Res() res: Response, @UploadedFile() file,) {
    try{
      const response = await this.appService.postFile(file)
      return res.status(201).json({
        status: 201,
        success: true,
        message: response
      });
    }
    catch(err){
      console.log(err)
      return res.status(500).send({
        status: 500,
        success: false,
        message: "Something went wrong",
    });
    }
  }
}