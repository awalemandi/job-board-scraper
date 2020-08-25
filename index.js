
// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1CukE2LF0bZF8LAOPdh7kWGnIEYMbqEA88a1bvwYzI9M');

(async function() {                         //Immediately Invoked Function Expression (IIFE)
    
    // OR load directly from json file if not in secure environment
	
	
    await doc.updateProperties({ title: 'renamed doc' })
    
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRows([
        { title: 'Front End Developer', location: 'SYD' },
        { title: 'UX/UI designer', location: 'MEL'} 
    ])
}) ()

