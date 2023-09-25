import axios from 'axios'
import { 
	ErrorResponse, 
	NoToken
} from './apiResponses'

import { API_URI } from '../config.dev'


/**
 * 
 * @param {*} token 
 * @returns 
 */
export const getAll = async token => {

	if( !token ) return NoToken()

	return axios.post(`${API_URI}/specialties`, null, { headers: { Authorization: token } })
					.then(resp => resp.data)
					.catch(err => ErrorResponse(err.response))

}