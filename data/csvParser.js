const neatCsv = require('neat-csv');
const fs = require('fs');
const regression = require('regression');
const moment = require('moment');

function getCityFilename(city) {
  city = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
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
  let totalRecuperados = 0;
  let totalSuspeitos = 0;
  let values = [];

  let beforeFirstCase = true;

  extractedData.forEach((e, i) => {
    if (parseInt(e.novosCasos) >= 1) beforeFirstCase = false;

    if (!beforeFirstCase) {
      e.novosCasos = parseInt(e.novosCasos);
      e.novosObitos = parseInt(e.novosObitos);
      e.novosRecuperados = parseInt(e.novosRecuperados);
      e.novosSuspeitos = parseInt(e.novosSuspeitos);
  
      totalCasos += e.novosCasos;
      totalObitos += e.novosObitos;
      totalRecuperados += e.novosRecuperados;
  
      e.totalCasos = totalCasos;
      e.totalObitos = totalObitos;
      e.totalRecuperados = totalRecuperados;
  
      values.push([i, e.totalCasos]);
    }
  });

  const options = {
    order: 2,
    precision: 10,
  }

  const [a, b] = regression.exponential(values, options).equation;
  const doublingTime = Math.log(2)/b;

  let weeks = []
  let weeklyDeaths = 0;
  let weeklyCases = 0;
  let week = 0;

  extractedData.forEach((e, i) => {
    let weekDay = moment(e.data.split('/').join('-'), 'DD/MM/YYYY').day();
    weeklyCases += e.novosCasos;
    weeklyDeaths += e.novosObitos;

    if (weekDay === 1 || i === extractedData.length-1) {
      weeks.push({week, weeklyDeaths, weeklyCases});
      weeklyDeaths = 0;
      weeklyCases = 0;
      week++;
    }

    e.estimativa = parseFloat((a * Math.exp((i) * b)).toFixed(2)); 
  });

  return {
    values: extractedData,
    function: { a, b, doublingTime },
    weeks
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