const { Sheet } = require('./sheet');
const fetch = require('node-fetch');

const jobSiteUrl = 'https://jobs.github.com/positions.json?description=python&location=new+york';
const googleSheetId = '1CukE2LF0bZF8LAOPdh7kWGnIEYMbqEA88a1bvwYzI9M';

(async function () {                         //Immediately Invoked Function Expression (IIFE)
   
    const result = await fetch(jobSiteUrl);
    const json = await result.json();

    console.log({ json });                          //display the result array in json
    const rows = json.map(job => {                  //map json object to match google sheet columns
        return {
            company: job.company,
            title: job.title,
            location: job.location,
            date: job.created_at,
            url: job.url
        }
    });
    
    const jobSheet = new Sheet(googleSheetId);
    await jobSheet.load();

    await jobSheet.addRows(rows);

})();

