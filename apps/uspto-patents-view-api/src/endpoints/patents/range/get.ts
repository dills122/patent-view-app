import got from 'got';
import PatentConfig from '../config';
import MainConfig from '../../../config';
import path from 'path';
import { EMPTY, from } from 'rxjs';
import { expand, take, concatMap } from 'rxjs/operators';
import QueryBuilder, { QueryObject, SearchTerm } from '../../../query-system/build';

const PAGE_SIZE = 1000;

export interface RangeArgs {
  startDate: string;
  endDate: string;
}

interface PatentResponse {
  patents: Patent[];
  count: number;
  total_patent_count: number;
}

export interface Patent {
  patent_number: string;
  patent_date: string;
  patent_title: string;
  patent_abstract?: string;
  inventors?: Investor[];
}

export interface Investor {
  investor_last_name: string;
  investor_first_name: string;
  investor_key_id: string;
}

export type DataPoints = string[];

function buildRangeQueryStringObject(args: RangeArgs): SearchTerm[] {
  return [
    {
      _eq: {
        patent_type: 'design'
      }
    },
    {
      _gte: {
        patent_date: args.startDate
      }
    },
    {
      _lte: {
        patent_date: args.endDate
      }
    }
  ];
}

export default class Range {
  between(args: RangeArgs, dataPoints: DataPoints = []) {
    const queryObject = QueryBuilder.build({
      and: buildRangeQueryStringObject(args)
    });
    const requestArgs = {
      args,
      dataPoints,
      queryParamObject: queryObject
    };
    return this.request(requestArgs, 1).pipe(
      expand((data, index) => {
        const { count } = data.body;
        if (count < PAGE_SIZE) {
          return EMPTY;
        }
        return this.request(requestArgs, index++);
      }),
      concatMap((data) => {
        return data.body.patents;
      }),
      take(10)
    );
  }

  private request(
    requestPayload: {
      args: RangeArgs;
      dataPoints: DataPoints;
      queryParamObject: QueryObject;
    },
    page: number
  ) {
    return from(
      got<PatentResponse>(path.join(MainConfig.apiUrl, PatentConfig.subsdirectory, PatentConfig.endpoint), {
        searchParams: {
          q: JSON.stringify(requestPayload.queryParamObject),
          f: JSON.stringify(['patent_number', 'patent_date', 'patent_title', ...requestPayload.dataPoints]),
          o: JSON.stringify({
            per_page: PAGE_SIZE,
            page
          })
        }
      })
    );
  }
}
