import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Endpoints } from 'uspto-patents-view-api';

const GetRange = Endpoints.Patents.Range.Get.Range;

@Injectable()
export class AppService {
  getHello() {
    return { message: 'Hello World!' };
  }
  async patentTest() {
    try {
      const patent = new GetRange();
      return await lastValueFrom(
        patent.between({
          startDate: '2021-03-01',
          endDate: '2021-09-10',
          pages: 3,
          pageSize: 10,
        }),
      );
    } catch (err) {
      throw err;
    }
  }
}
