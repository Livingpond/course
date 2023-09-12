const xlsx = require('node-xlsx');
const fs = require('fs');

// Parse a buffer

const sheets = xlsx.parse("test.xlsx");

const sheets1 = sheets[0];

const data = [];

for(const rowId in sheets1["data"]){
    console.log(rowId);
    const row = sheets1["data"][rowId];
    console.log(row);
    data.push(row);
}
console.log(data);

for (let i = 0; i < data.length; i++) {
    const row = data[i];
    row.push(row[0] * 2);
  }

console.log(data)

const excel = [{
    name:"sheet1",
    data,
},];

const buffer = xlsx.build(excel)

fs.writeFile("new.xlsx",buffer,function (err){
    if(err){
        console.log("file write error "+ err);
        return;
    }

    console.log("write compeleted")
})

