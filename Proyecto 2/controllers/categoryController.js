const { Category } = require('../models');

class CategoryController {
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      res.render('categories/index', { title: 'Categorías', categories });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req, res) {
    if (req.method === 'POST') {
      try {
        await Category.create(req.body);
        res.redirect('/categories');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.render('categories/create', { title: 'Agregar Categoría' });
    }
  }

  async update(req, res) {
    if (req.method === 'POST') {
      try {
        await Category.update(req.body, { where: { id: req.params.id } });
        res.redirect('/categories');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const category = await Category.findByPk(req.params.id);
      res.render('categories/update', { title: 'Editar Categoría', category });
    }
  }

  async delete(req, res) {
    try {
      await Category.destroy({ where: { id: req.params.id } });
      res.redirect('/categories');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new CategoryController();
