import { Router } from 'express';
import {
	createVolunteer,
	viewVolunteer,
	deleteVolunteer,
	updateVolunteer
} from './controller/volunteer_controller';

const router = new Router();

router
	.post('/', createVolunteer)
	.get('/', viewVolunteer)
	.delete('/', deleteVolunteer)
	.put('/',updateVolunteer);

export default router;
