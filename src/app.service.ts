import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { File } from 'file';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  async postFile(file: File): Promise<{ filePayload: Object; }> {
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
    const filePayload = uploadResponse.data.file
    return { filePayload }
    
  }
}
