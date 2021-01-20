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
    
export const fetchVolunteers = () => fetch(volunteerUrl).then(res => res.json());

export const createVolunteer = ({id, name, phoneNumber, date }) => config(volunteerUrl, 'POST', {id, name, phoneNumber, date });

export const deleteVolunteerForm = ({ id }) => config(volunteerUrl, 'DELETE', { id });

export const updateVolunteerForm = ({id, name, phoneNumber, date }) => {console.log("aaaaa",id),config(volunteerUrl, 'PUT', { id, name, phoneNumber, date })};