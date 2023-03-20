const { db } = require('./db');
// server that we already created and used as the previous entry point
const http = require('./server.js');
const port = process.env.PORT || 8080;
const seed = require('../seed');

const init = async () => {
  try {
    if (process.env.SEED === 'true') {
      await seed();
      console.log('seed complete');
    } else {
      await db.sync();
      console.log('db synced');
    }
    // start listening with our express server (and create a 'server' object representing our server)
    http.listen(port, () => console.log(`listening on port ${port}`))
  } catch (err) {
    console.log(err);
  }
};

init();
