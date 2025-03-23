const express = require('express');
const app = express();
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let port = 3000;

const startServer = (port) => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use.`);
      rl.question('Would you like to run the app on another port instead? (Y/n) ', (answer) => {
        if (answer.toLowerCase() === 'y' || answer === '') {
          rl.question('Please enter a new port: ', (newPort) => {
            port = parseInt(newPort, 10);
            startServer(port);
          });
        } else {
          console.log('Exiting...');
          rl.close();
        }
      });
    } else {
      console.error(err);
    }
  });
};

startServer(port);
