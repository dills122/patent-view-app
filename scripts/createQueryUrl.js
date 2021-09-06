const { URL, URLSearchParams } = require('url');

const apiUrl = 'https://api.patentsview.org/patents/query';

const querystringObj = {
    "_and": [
        {
            '_eq': {
                "patent_type": "design"
            }
        },
        {
            "_gte": {
                "patent_date": "2020-09-05"
            }
        },
        {
            "_lte": {
                "patent_date": "2021-09-05"
            }
        }
    ]
};

const stringyQueryStringObj = JSON.stringify(querystringObj);

console.log(stringyQueryStringObj);

const url = new URL(apiUrl);

url.searchParams.append('q', stringyQueryStringObj);

url.searchParams.append('f', JSON.stringify([
    'patent_number',
    'inventor_last_name',
    'inventor_first_name',
    'patent_date',
    'patent_title',
    'patent_abstract'
]));

console.log(url.href);