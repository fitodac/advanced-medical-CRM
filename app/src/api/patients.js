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
 * @param {*} request 
 * @returns 
 */
export const Get = async (token, request) => {

	if( !token ) return NoToken()
	if( !NoRequest ) return NoRequest()

	return axios.post(`${API_URI}/patient`, request, { headers: { Authorization: token } })
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

	return axios.post(`${API_URI}/patient/create`, request, { headers: { Authorization: token } })
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

	return axios.put(`${API_URI}/patient/update`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}