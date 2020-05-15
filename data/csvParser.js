const neatCsv = require('neat-csv');
const fs = require('fs');
const regression = require('regression');
const moment = require('moment');

function getCityFilename(city) {
  return `${__dirname}/${city.toLowerCase().trim().replace(/\s/g, '')}.csv`;
}

async function parseFile(city='Pouso Alegre') {
  const fileName = getCityFilename(city);

  let extractedData = [];

  try {
    extractedData = await neatCsv(fs.readFileSync(fileName));
  } catch (error) {
    throw(error);
  }

  let totalCasos = 0;
  let totalObitos = 0;
  let values = [];

  extractedData.forEach((e, i) => {
    e.novosCasos = parseInt(e.novosCasos);
    e.novosObitos = parseInt(e.novosObitos);

    totalCasos += e.novosCasos;
    totalObitos += e.novosObitos;

    e.totalCasos = totalCasos;
    e.totalObitos = totalObitos;

    values.push([i, e.totalCasos]);
  });

  const options = {
    order: 2,
    precision: 10,
  }

  const [a, b] = regression.exponential(values, options).equation;
  const doublingTime = Math.log(2)/b;

  extractedData.forEach((e, i) => {
    e.estimativa = parseFloat((a * Math.exp((i) * b)).toFixed(2));
  });

  return {
    values: extractedData,
    function: { a, b, doublingTime }
  };
}

function writeToFile(city, data) {
  const fileName = getCityFilename(city);

  fs.readFile(fileName, 'utf8', function (err, fileData) {
    let formatted = fileData;

    data.forEach((e) => {
      if (!e) return;
      
      const regex = new RegExp(e.split(',')[0] + "\,[0-9]*\,[0-9]*", "g");

      if (fileData.search(regex) >= 0) {
        formatted = fileData.replace(regex, e);
      } else {
        formatted = fileData + '\n' + e;
      }
    });

    fs.writeFile(fileName, formatted, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

module.exports = {
  parseFile,
  writeToFile
}