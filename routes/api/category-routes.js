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
      category_id: req.body.id,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(
      {
        name: req.body.name
      },
      {
        where: {
          category_id: req.params.id,
        }
      }
    );
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({error});
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryDelete) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }

    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
