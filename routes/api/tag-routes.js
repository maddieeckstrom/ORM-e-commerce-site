const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags and include its associated product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{model:Product},{model:ProductTag}]
  }).then((tagData) => {
    res.json(tagData);
  })
});

// find a single tag by its id and include its associated product data
router.get('/:id', (req, res) => {
  Tag.findOne({
    include: [{model:Product},{model:ProductTag}]
  }).then((tagData) => {
    res.json(tagData);
  })
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_id: req.body.id,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        name: req.body.name
      },
      {
        where: {
          tag_id: req.params.id,
        }
      }
    );
    res.json(updatedTag);
  } catch (error) {
    res.status(500).json({error});
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagDelete) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }

    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
