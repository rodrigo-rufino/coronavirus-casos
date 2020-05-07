function round(number, precision=1) {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

function exponential(data, options={order: 2, precision: 2}) {  
  const sum = [0, 0, 0, 0, 0, 0];
  
  for (let n = 0; n < data.length; n++) {
    if (data[n][1] !== null) {
      sum[0] += data[n][0];
      sum[1] += data[n][1];
      sum[2] += data[n][0] * data[n][0] * data[n][1];
      sum[3] += data[n][1] * Math.log(data[n][1]);
      sum[4] += data[n][0] * data[n][1] * Math.log(data[n][1]);
      sum[5] += data[n][0] * data[n][1];
    }
  }
  
  const denominator = ((sum[1] * sum[2]) - (sum[5] * sum[5]));
  const a = Math.exp(((sum[2] * sum[3]) - (sum[5] * sum[4])) / denominator);
  const b = ((sum[1] * sum[4]) - (sum[5] * sum[3])) / denominator;
  const coeffA = round(a, options.precision);
  const coeffB = round(b, options.precision);
  const predict = x => ([
    round(x, options.precision),
    round(coeffA * Math.exp(coeffB * x), options.precision),
  ]);
  
  return [coeffA, coeffB, Math.log(2)/coeffB];
}

module.exports = {
  exponential,
}

