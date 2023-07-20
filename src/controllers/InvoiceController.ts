import {Request} from 'express';

const InvoiceController = {
  create: async (req: Request, res: Response) => {
    console.log('----debug:', req.body);

    return res.json();
  }
};

export default InvoiceController;
