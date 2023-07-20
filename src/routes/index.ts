import express from 'express';

const apiRoute = express.Router();
apiRoute.use('/invoice', require('./invoice.route').default);

export default apiRoute;
