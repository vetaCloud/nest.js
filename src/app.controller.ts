import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import axios from 'axios'
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
      const uploadResponse = await axios({
        maxContentLength: Infinity, maxBodyLength: Infinity, 
        headers: {
            "Content-Type": "application/json",
            'X_API_KEY': process.env.VETACLOUD_PRIVATE_KEY, 'X_ROUTE_NAME': process.env.VETACLOUD_INDEX_ROUTE
        },
        method: 'POST',
        url: `${process.env.VETACLOUD_URL}/nest/`,
        data: { filename: file.originalname, raw: file.buffer }
      })
      return res.status(201).json({
        status: 201,
        success: true,
        message: uploadResponse.data.file
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