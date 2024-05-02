const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const htmlRoutes = require('./htmlRoutes');

// Mount API routes under /api/notes path prefix
router.use('/api/notes', apiRoutes);

// Mount HTML routes under root path
router.use('/', htmlRoutes);

module.exports = router;