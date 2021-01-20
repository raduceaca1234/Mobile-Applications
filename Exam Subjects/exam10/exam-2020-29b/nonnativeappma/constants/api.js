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

export const fetchVolunteers = () => fetch('http://10.0.2.2:2902/open').then(res => res.json());


export const fetchAll = () => fetch('http://10.0.2.2:2902/filled').then(res => res.json());


export const fetchPaints = () => fetch('http://10.0.2.2:2702/locations').then(res => res.json());

export const fetchVolunteersLocation = ({ location }) => fetch('http://10.0.2.2:2702/files/' + location).then(res => res.json());


export const fetchVolunteersMe = ({ driver }) => fetch('http://10.0.2.2:2902/my/' + driver).then(res => res.json());


export const createVolunteer = (data) => config('http://10.0.2.2:2702/file', 'POST', data);

export const deleteVolunteerForm = ({ identifier }) => config('http://10.0.2.2:2702/file/' + identifier, 'DELETE', { identifier });

export const updateVolunteerForm = ({ identifier, name, status, passengers, driver, paint, capacity }) => { console.log("aaaaa", identifier), config(volunteerUrl, 'PUT', { identifier, name, status, passengers, driver, paint, capacity }) };