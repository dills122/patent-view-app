import { Controller, Get, Query, Logger } from '@nestjs/common';
import { Endpoints } from 'uspto-patents-view-api';
import { lastValueFrom } from 'rxjs';

const GetRange = Endpoints.Patents.Range.Get.Range;

export interface RecentPatentsArgs {
  startDate: string;
  endDate: string;
}

@Controller('patent')
export class PatentController {
  public logger: Logger = new Logger('Patent-Controller');
  @Get()
  async getRecent(@Query() query: RecentPatentsArgs): Promise<Endpoints.Patents.Range.Get.Patent[]> {
    try {
      this.logger.log('Getting Recent Patent Results');
      const patent = new GetRange();
      return await lastValueFrom(
        patent.between({
          startDate: query.startDate,
          endDate: query.endDate,
          pages: 3,
          pageSize: 10
        })
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
