const request = require('request')
const fs = require('fs')
const readline = require('readline')

const file = 'data.txt';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const readURL = function() {

  rl.question('Please provide an url to download \n', (answer) => {
    // TODO: Log the answer in a database
    callRequest(answer);
  });
}

const callRequest = function(URL) {
  request(URL, async (error, response, body) => {
    const data = body;
    if (response.statusCode != 200) {
      return console.log('There was an error in getting data!')
    }
    await writeFile(data);
  })
}

const writeFile = function(data) {

  fs.access(file, fs.constants.F_OK, (err) => {
    err ? writeNewFile(data) : overwrite(data)
  });

}

const writeNewFile = function(data) {
  fs.writeFile('data.txt', data, (err) => {
    if (err) console.log(err);
    const stats = fs.statSync("data.txt").size;
    console.log(`Downloaded and saved ${stats} bytes to ./data.txt`);
  }) 
}

const overwrite = function(data) {

  console.log('owerwrite')

  rl.question('File already exists! Do you want to overwrite it? y or n \n', (answer) => {
 
    if (answer === 'y') {
      writeNewFile(data);
    } else if(answer === 'n') {
      console.log('EXITING')
    } 
    rl.close(); 
  })
  return;
}

readURL();


