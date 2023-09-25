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
export const List = async token => {

	if( !token ) return NoToken()

	return axios.post(`${API_URI}/doctors`, null, { headers: { Authorization: token } })
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

	return axios.post(`${API_URI}/doctors/getInfo`, request, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}