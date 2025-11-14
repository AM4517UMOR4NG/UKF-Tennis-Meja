require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri('ukf_tt');

  process.env.MONGODB_URI = uri;
  process.env.PORT = process.env.PORT || 4000;
  process.env.ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key';
  process.env.UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';

  console.log(`[memdb] MongoDB running at ${uri}`);
  console.log('[memdb] Starting API server with in-memory database...');

  const cleanup = async () => {
    console.log('\n[memdb] Shutting down in-memory MongoDB...');
    await mongod.stop();
    process.exit(0);
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  require('../server');
})();


