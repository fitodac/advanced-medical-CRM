import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ErrorResponse } from './useApiResponses'
import { useAuth } from './useAuth'

import axios from 'axios'


export const useLogin = ({ url, body }) => {

	// const [ response, setResponse ] = useState({})
	const [ loading, setLoading ] = useState(true)
	const [ error, setError ] = useState(false)
	const { login } = useAuth()

	useEffect(() => setLoading(false), [])

	const formLogin = () => {
		try {
			setLoading(true)

			axios.post(url, body)
			.then(resp => {
				login({...resp.data})
			})
			.catch(err => setError(ErrorResponse(err.response)))
			.finally(() => setLoading(false))
		}catch (err) {
			console.log('Error:', err)
			throw new Error(err)
		}
	}

	return { error, loading, formLogin }
}


useLogin.propTypes = {
	url: PropTypes.string.isRequired,
	body: PropTypes.string
}