
### Count Tags in ASC order
```
db.getCollection('quotes').aggregate(
  [
    { $unwind: { path: '$tags' } },
    {
      $group: { _id: '$tags', count: { $sum: 1 } }
    },
    { $sort: { _id: 1 } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
```


