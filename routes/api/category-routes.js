const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData); 
  } catch (err) {
    res.status(500).json('OOPS! You are suck.');
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that ID!' })
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json('OOPS! You are suck.');
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    if (!categoryData) {
      res.status(404).json({ message: 'Cannot create category!' });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json('OOPS! You are suck.');
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!categoryData) {
      res.status(404).json({ message: 'Cannot update category!' })
    };
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json('OOPS! You are suck.');
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
