const neatCsv = require('neat-csv');
const fs = require('fs');
const regression = require('regression');
const moment = require('moment');

async function parseFile(city='Pouso Alegre') {
  const fileName = `${__dirname}/${city.toLowerCase().trim().replace(/\s/g, '')}.csv`;

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

module.exports = {
  parseFile
}