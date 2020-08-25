const { Sheet } = require('./sheet');
const fetch = require('node-fetch');

// const jobSiteUrl = `https://jobs.github.com/positions.json?page=1&search=code`;
const googleSheetId = '1CukE2LF0bZF8LAOPdh7kWGnIEYMbqEA88a1bvwYzI9M';
const searchCriteria = `code`;
                                                     //Immediately Invoked Function Expression (IIFE)
async function getJobs(i) {                        //i = results page number
   
    const result = await fetch(`https://jobs.github.com/positions.json?page=${i}&search=${searchCriteria}`);
    const json = await result.json();

    // console.log({ json });                          //display the result array in json
    const rows = json.map(job => {                  //map json object to match google sheet columns
        return {
            company: job.company,
            title: job.title,
            location: job.location,
            type: job.type,
            date: job.created_at,
            url: job.url
        }
    })
    
    const jobSheet = new Sheet(googleSheetId);
    await jobSheet.load();

    await jobSheet.addRows(rows);
    return rows;
}

//function to filter for roles using .includes()//sort by searchCriteria
//function to sort() jobs by date before populating sheet

(async function () {
    let i = 1;
    let rows = [];
    while (true) {                      //loop to combine results until page with no results
        const newRows = await getJobs(i);
        if (newRows.length === 0) break;
        rows = rows.concat(newRows);
        // console.log(`current row length: ${newRows.length}`);
        i++;
    }
    // console.log(`Total row length: ${rows.length}`);
})();
