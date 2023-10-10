
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
	token = null,
	init = 1 // Set "init" to zero to disable the auto-execution of this hook
}) => {

	const [response, setResponse] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [reload, setReload] = useState(init)

	const refetch = async () => setReload(prev => prev + 1)

	useEffect(() => {
		if( reload ){
			const fetchData = () => {
				
				axios.request({
					url,
					method,
					data: body, 
					headers: {
						...headers, 
						Authorization: token,
						'Content-Type': 'application/json',
						Accept: 'application/json',
						'Access-Control-Allow-Origin': '*'
					}
				})
				.then(resp => setResponse(resp.data))
				.catch(err => {
					setError(ErrorResponse(err.response))
					usekickOut(err.response.data)
				})
				.finally(() => setLoading(false))
			}

			try {
				if( !token ) setError(NoToken())
				fetchData()
			}catch(err){
				console.log('Error:', err)
				throw new Error(err)
			}
		}
		// eslint-disable-next-line
	}, [reload])

	return { response, error, loading, refetch }

}


useAxios.propTypes = {
	url: PropTypes.string.isRequired,
	method: PropTypes.string,
	headers: PropTypes.object
}