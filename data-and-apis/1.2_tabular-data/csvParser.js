function mergeRecords(records) {
    return  records.reduce((grouping, record) => {
        const key = Object.keys(record)[0];
        const value = record[key]
        grouping[key] = value

        return grouping
    }, {})
}

async function parseCSV(file) {
    const csv  = await fetch(file);
    const text = await csv.text();

    let table  = text.split('\n');
    let headers = table.splice(0, 1)[0].split(',')

    const records = table.map(row => {
        let columns = row.split(',')

        const values = headers.map((header, index) => (
            { [header]: columns[index] })
        )

        return mergeRecords(values)
    })
    records.splice(-1, 1)

    return records
}