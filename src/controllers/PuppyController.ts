import { Request, Response, NextFunction } from 'express';
import { Puppy, WaitList } from '../models';
import { handleError } from '../errors/handleError';
import moment from 'moment';

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, pageSize, waitList, searchTerm, startDate, endDate } = req.query;

    const query = Puppy.find(searchTerm ? {
      $or: [
        {
          owner: new RegExp(searchTerm, 'gi')
        },
        {
          name: new RegExp(searchTerm, 'gi')
        },
        {
          service: new RegExp(searchTerm, 'gi')
        }
      ]
    } : {});

    if (waitList) {
      query.where('waitList', waitList);
    }

    if (startDate) {
      query.gte('createdAt', moment(startDate).startOf('day').toDate());
    }

    if (endDate) {
      query.lte('createdAt', moment(endDate).endOf('day').toDate());
    }

    const totalCount = await Puppy.countDocuments(query);

    query.sort({ order: 1 });

    if (page || pageSize) {
      const pageNum = page ? parseInt(page, 10) : 1;
      const perPage = pageSize ? parseInt(pageSize, 10) : 10;

      query.skip((pageNum - 1) * perPage).limit(perPage);
    }

    const puppies = await query.exec();

    res.json({
      data: puppies,
      totalCount
    });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { waitList: waitListId, ...data } = req.body;

    const waitList = await WaitList.findById(waitListId);

    if (!waitList) {
      return handleError(res, 400, 'WaitList does not exist');
    }

    const orders = await Puppy.distinct('order', {});
    const maxOrder = orders.reduce((el, cur) => Math.max(el, cur), 0);

    const puppy = new Puppy({
      ...req.body,
      order: maxOrder + 1,
    });

    await puppy.save();

    res.status(201).json(puppy);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params as any;

    const puppy = await Puppy.findById(id);

    if (!puppy) {
      return handleError(res, 400, 'Puppy does not exist');
    }

    puppy.set(req.body);

    await puppy.save();

    res.json(puppy.save());
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id }: { id: string } = req.params as any;
    const { action } = req.body;

    const puppy = await Puppy.findById(id);

    if (!puppy) {
      return handleError(res, 400, 'Puppy does not exist');
    }

    if (action === 'up') {
      const comparePuppy = await Puppy.findOne({ waitList: puppy.waitList, order: { $lt: puppy.order } }).sort('-order');
      if (comparePuppy) {
        const order = puppy.order;
        puppy.order = comparePuppy.order;
        comparePuppy.order = order;

        await puppy.save();
        await comparePuppy.save();
      }
    } else if (action === 'down') {
      const comparePuppy = await Puppy.findOne({ waitList: puppy.waitList, order: { $gt: puppy.order } }).sort('order');
      if (comparePuppy) {
        const order = puppy.order;
        puppy.order = comparePuppy.order;
        comparePuppy.order = order;

        await puppy.save();
        await comparePuppy.save();
      }
    }

    res.status(200).json();
  } catch (err) {
    next(err);
  }
}
