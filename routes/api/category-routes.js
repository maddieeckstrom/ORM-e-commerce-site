const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories by its id value
router.get('/', (req, res) => {
  Category.findAll({
    include: [{model:Product}]
  }).then((categoryData) => {
    res.json(categoryData);
  })
});

// find one category by its id value
router.get('/:id', (req, res) => {
  Category.findOne({
    include: [{model:Product}]
  }).then((categoryData) => {
    res.json(categoryData);
  })
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      reader_id: req.body.reader_id,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
