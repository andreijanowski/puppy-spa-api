import { Request, Response, NextFunction } from 'express';
import { WaitList } from '../models';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, pageSize } = req.query;

    const pageNum = page ? parseInt(page, 10) : 1;
    const perPage = pageSize ? parseInt(pageSize, 10) : 10;

    const data = await WaitList.find().skip((pageNum - 1) * perPage).limit(perPage);
    const totalCount = await WaitList.countDocuments();

    res.json({
      data,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const waitList = new WaitList(req.body);

    await waitList.save();

    res.status(201).json(waitList);
  } catch (err) {
    next(err);
  }
}

export async function checkDate(req: Request, res: Response, next: NextFunction) {
  try {
    const { date }: { date: string } = req.query as any;

    const waitList = await WaitList.findOne({ date });

    res.json(waitList);
  } catch (err) {
    next(err);
  }
}
