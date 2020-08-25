const { GoogleSpreadsheet } = require('google-spreadsheet');

class Sheet {
    constructor(args) {
        this.doc = new GoogleSpreadsheet(args);
    }

    async load() {
        await this.doc.useServiceAccountAuth(require('../credentials.json'));
        await this.doc.loadInfo();
    }

    async addRows(rows) {
        const sheet = this.doc.sheetsByIndex[0];
        await sheet.addRows(rows);
    }
}


module.exports = { Sheet };

//  test
// (async function () {
//     const sheet = new Sheet('1CukE2LF0bZF8LAOPdh7kWGnIEYMbqEA88a1bvwYzI9M');
//     await sheet.load();
//     await sheet.addRows([
//         { title: 'Front End Developer', location: 'SYD' },
//         { title: 'UX/UI designer', location: 'MEL' }
//     ]);
// })();