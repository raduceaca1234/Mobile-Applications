import { SERVER_URL } from './constants';

const volunteerUrl = SERVER_URL;


const axios = require('axios');

const config = (url, method, body) =>

	fetch(url, {
		method,
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
    }).then(response => response.json());
    
export const fetchVolunteers = () => fetch('http://10.0.2.2:2019/all').then(res => res.json());

export const fetchPaints = () => fetch('http://10.0.2.2:2019/paint').then(res => res.json());


export const fetchVolunteersMe = ({driver}) => fetch('http://10.0.2.2:2019/my/' + driver).then(res => res.json());


export const createVolunteer = ({identifier, name, status, passengers, driver, paint, capacity }) => config(volunteerUrl, 'POST', {identifier, name, status, passengers, driver, paint, capacity });

export const deleteVolunteerForm = ({ identifier }) => config('http://10.0.2.2:2019/vehicle/' + identifier, 'DELETE', { identifier });

export const updateVolunteerForm = ({identifier, name, status, passengers, driver, paint, capacity }) => {console.log("aaaaa",identifier),config(volunteerUrl, 'PUT', { identifier, name, status, passengers, driver, paint, capacity })};