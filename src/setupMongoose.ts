import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${process.env.MONGO_HOSTNAME}/${process.env.MONGO_DB}`;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGO_URI, { useNewUrlParser: true/*, replicaSet: 'rs0'*/ }, (err) => {
  if (err) console.log(err);
});

mongoose.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {

    ret.id = ret._id;
    delete ret._id;

    return ret;
  }
});
