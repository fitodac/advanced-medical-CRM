import axios from 'axios'
import { 
	ErrorResponse, 
	NoToken, 
	NoRequest 
} from './apiResponses'

import { API_URI } from '../config.dev'

import { getAll as getCenters } from './medicalCenter'
import { getAll as getSpecialtiesList } from './specialty'


/**
 * 
 * @param {*} token 
 * @returns 
 */
export const List = async token => {

	if( !token ) return NoToken()

	return axios.post(`${API_URI}/user/list`, null, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}


/**
 * 
 * @param {*} token 
 * @param {*} request 
 * @returns 
 */
export const Get = async (token, request) => {

	if( !token ) return NoToken()
	if( !NoRequest ) return NoRequest()

	return axios.post(`${API_URI}/user`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}


/**
 * 
 * @param {*} token 
 * @param {*} request 
 * @returns 
 */
export const Create = async (token, request) => {

	if( !token ) return NoToken()
	if( !NoRequest ) return NoRequest()

	return axios.post(`${API_URI}/user/create`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}



/**
 * 
 * @param {*} token 
 * @param {*} request 
 * @returns 
 */
export const Update = async (token, request) => {

	if( !token ) return NoToken()
	if( !NoRequest ) return NoRequest()

	return axios.put(`${API_URI}/user/update`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}



/**
 * 
 * @param {*} role 
 * @returns 
 */
export const BadgeClassName = role => {
	switch(role){
		case 'admin': return 'badge ghost bg-primary border-primary text-primary'
		case 'doctor': return 'badge ghost bg-green-500 border-green-500 text-green-500'
	}
}


/**
 * 
 * @param {*} token 
 * @returns 
 */
export const formFieldsData = async token => {
	const centers = await getCenters(token)
	const specialties = await getSpecialtiesList(token)
	return {
		centers: centers.data, 
		specialties: specialties.data
	}
}



export const updateUserInLocalStorage = data => {

	const stored_user = JSON.parse(window.localStorage.getItem('user'))
	const new_user = {
		...stored_user,
		info: {
			...stored_user.info,
			...data
		}
	}

	window.localStorage.setItem('user', JSON.stringify(new_user))
}