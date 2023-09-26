import axios from 'axios'
import { 
	ErrorResponse, 
	NoToken, 
	NoRequest 
} from './apiResponses'

import { API_URI } from '../config.dev'



/**
 * 
 * @param {*} token 
 * @returns 
 */
export const getAll = async token => {

	if( !token ) return NoToken()

	return axios.post(`${API_URI}/center/getAll`, null, { headers: { Authorization: token } })
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

	return axios.post(`${API_URI}/center`, request, { headers: { Authorization: token } })
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

	return axios.post(`${API_URI}/center/create`, request, { headers: { Authorization: token } })
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

	return axios.put(`${API_URI}/center/update`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}