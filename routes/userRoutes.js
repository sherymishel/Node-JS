const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res, next) => {
    try{
      const users = UserService.getUsers();
      if (users) {
        res.status(200)
        res.data = users;
      }
    }catch (err) {
      res.status(400)
        res.err = err;
    } finally {
        next();
    }
    }, responseMiddleware);
  
  router.get('/:id', (req, res, next) => {
    try{
      const id = req.params.id;
      const foundUser = UserService.search({ id });
      if (foundUser) {
        res.status(200)
        res.data = foundUser;
      }
    }catch (err) {
      res.status(400)
        res.err = err;
    } finally {
        next();
    }
    }, responseMiddleware);
  
  router.post('/', createUserValid, (req, res, next) => {
    try{
      const validUser = req.user;
      if (validUser) {
        res.status(200)
        res.data = validUser;
      }
    }catch (err) {
      res.status(400)
        res.err = err;
    } finally {
        next();
    }
    }, responseMiddleware);
  
  router.put('/:id', updateUserValid, (req, res, next) => {
    try{
      const id = req.params.id;
      const userInfo = req.body;
      const updatedUser = UserService.update(id, userInfo);
      if (updatedUser) {
        res.status(200)
        res.data = updatedUser;
      }
    }catch (err) {
      res.status(400)
        res.err = err;
    } finally {
        next();
    }
  }, responseMiddleware);
  
  router.delete('/:id', (req, res, next) => {
    try{
      const id = req.params.id;
      const deletedUser = UserService.remove(id);
      if (deletedUser) {
        res.status(200)
        res.data = deletedUser;
      }
    }catch (err) {
      res.status(400)
        res.err = err;
    } finally {
        next();
    }
  }, responseMiddleware);
module.exports = router;