const fs = require('fs');
const path = require('path');

function readSort(data) {
  return new Promise((resolve) => {
    let array = data.toString().split(/\s+/);
    let uniqueArray = [...new Set(array)];
    let result = [];

    for (let i = 0; i < uniqueArray.length; i++) {
      let filteredArray = array.filter((element) => element === uniqueArray[i]);
      let obj = { [uniqueArray[i]]: filteredArray.length };
      result.push(obj);
    }

    let topValues = result.sort((a, b) => Object.values(b) - Object.values(a));
    let maxRepeated = Object.keys(topValues[0]);
    data = data.replace(new RegExp('\\b' + maxRepeated + '\\b', 'g'), 'foo' + maxRepeated + 'bar');
    resolve(data);
  });
}

module.exports = { readSort: readSort };
