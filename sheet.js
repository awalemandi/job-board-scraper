const { GoogleSpreadsheet } = require('google-spreadsheet');

class Sheet {
    constructor() {
        this.doc = new GoogleSpreadsheet('1CukE2LF0bZF8LAOPdh7kWGnIEYMbqEA88a1bvwYzI9M');
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


//  test
(async function () {
    const sheet = new Sheet();
    await sheet.load();
    await sheet.addRows([
        { title: 'Front End Developer', location: 'SYD' },
        { title: 'UX/UI designer', location: 'MEL' }
    ]);
})();
