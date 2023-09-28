
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { 
	ErrorResponse, 
	NoToken
} from './useApiResponses'
import { usekickOut } from './useAuth'

import axios from 'axios'


export const useAxios = ({ 
	url, 
	method = 'GET',
	headers = null,
	body = null,
	token = null
}) => {

	const [response, setResponse] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)


	useEffect(() => {
		const fetchData = () => {
			axios.request({
				url,
				method,
				data: body, 
				headers: {...headers, Authorization: token}
			})
			.then(resp => setResponse(resp.data))
			.catch(err => {
				setError(ErrorResponse(err.response))
				usekickOut(err.response.data)
			})
			.finally(() => setLoading(false))
		}


		setLoading(true)

		try {
			if( !token ) setError(NoToken())
			fetchData()
		}catch(err){
			console.log('Error:', err)
			throw new Error(err)
		}
	}, [
		url,
		body,
		headers,
		method,
		token
	])

	return { response, error, loading }

}


useAxios.propTypes = {
	url: PropTypes.string.isRequired,
	method: PropTypes.string,
	headers: PropTypes.object
}