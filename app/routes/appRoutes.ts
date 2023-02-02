import { Express } from 'express';
('use strict');
const routes = (app: Express) => {
  const guestController = require('../controller/guest');

  app.route('/valeo/guests/').get(guestController.getAllGuests);
  app.route('/valeo/guest/:guestCode').get(guestController.getGuestByCode);
  app.route('/valeo/guest').post(guestController.updateGuest);

  app.use(function (req, res) {
    res.sendStatus(404);
  });
};

module.exports = routes;
