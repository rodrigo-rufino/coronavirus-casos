const neatCsv = require('neat-csv');
const fs = require('fs');
const regression = require('./regression');
const moment = require('moment');

async function parseFile(city='Pouso Alegre') {
  const fileName = `${__dirname}/${city.toLowerCase().trim().replace(/\s/g, '')}.csv`;

  const extractedData = await neatCsv(fs.readFileSync(fileName));
  
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

  const [a, b, doublingTime] = regression.exponential(values);

  extractedData.forEach((e, i) => {
    e.estimativa = a * Math.exp((i) * b);
  });

  const lastDate = moment(extractedData[extractedData.length - 1].data.split('/').join('-'), 'DD/MM/YYYY');
  
  console.log('lastDate', lastDate);

  for (i = 0; i < 10; i++) {
    extractedData.push({
      data: lastDate.add(1, 'd').format('DD/MM/YYYY'),
      estimativa: a * Math.exp((extractedData.length + i) * b),
    })
  }

  console.log(a, b, doublingTime);

  return extractedData;
}

module.exports = {
  parseFile
}