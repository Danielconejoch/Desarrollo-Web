const Address = require('../models').Address;

class AddressesController {
  // Listar direcciones
  async index(req, res) {
    try {
      const addresses = await Address.findAll();
      res.render('addresses/index', { title: 'Direcciones Personales', addresses });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  // Crear una nueva dirección
  async create(req, res) {
    if (req.method === 'POST') {
      try {
        await Address.create(req.body);
        res.redirect('/addresses');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      res.render('addresses/create', { title: 'Agregar Dirección' });
    }
  }

  // Editar una dirección existente
  async update(req, res) {
    if (req.method === 'POST') {
      try {
        await Address.update(req.body, { where: { id: req.params.id } });
        res.redirect('/addresses');
      } catch (error) {
        res.status(500).send(error.message);
      }
    } else {
      const address = await Address.findByPk(req.params.id);
      res.render('addresses/update', { title: 'Editar Dirección', address });
    }
  }

  // Eliminar una dirección
  async delete(req, res) {
    try {
      await Address.destroy({ where: { id: req.params.id } });
      res.redirect('/addresses');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = AddressesController;
