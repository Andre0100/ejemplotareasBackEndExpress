const { MongoClient } = require('mongodb');

// Obtiene la URI desde la variable de entorno
const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error('❌ ERROR: La variable de entorno ATLAS_URI no está definida');
  process.exit(1);
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db(); // el nombre de la DB se toma de la URI o puedes especificarlo: db.db('ejemplo')
        console.log('✅ Conectado a MongoDB Atlas');
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
}; 
