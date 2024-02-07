import { Router } from 'express';
import personController from '../controllers/persons';
const router = Router();

// Base router '/'
router.route('/')
  .get(personController.getAllPersons)
  .post(personController.createPerson);

// Routes with id params
router.route('/:id')
  .get(personController.getPerson)
  .put(personController.updatePerson)
  .delete(personController.deletePerson);

export default router;