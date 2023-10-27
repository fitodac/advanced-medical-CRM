import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '.'
import { useAuth } from '../hooks'
import { API_URI } from '../config'

const TOAST_TIME_OUT = 2400

export const AppProvider = ({children}) => {

	const [ toastContext, setToastContext ] = useState({
		show: false,
		status: '',
		message: ''
	})

	const [user, setUser] = useState(useAuth().user)
	const { token_type, token } = useAuth().user

	const setUserInfo = data => {
		console.log('setUserInfo', data)
		setUser({...user, info: {...data}})
	}

	const notify = (message, status) => {
		setToastContext({
			show: true,
			status,
			message
		})
		setTimeout(() => {
			setToastContext({
				show: false,
				status: '',
				message: ''
			})
		}, TOAST_TIME_OUT)
	}


	return (
		<>
			<AppContext.Provider value={
				{
					user,
					API_URI,
					token: `${token_type} ${token}`,
					// methods
					notify,
					setUserInfo
				}}>
				{children}
			</AppContext.Provider>


			{/* Toast */}
			<input
				type="checkbox"
				id="toast"
				className="hidden"
				onChange={() => {}}
				checked={toastContext.show} />

			<label
				htmlFor="toast"
				className={`toast p-8 overflow-hidden shadow-2xl
					${toastContext.status === 'success' ?
						'bg-green-700 border-green-700 text-green-200' :
						'bg-red-700 border-red-700 text-red-200'}`}
				onClick={() => setToastContext({show: false, status: '', message: ''})}>
				<div className="">
					{toastContext.message.split('\n').map((msg, index) => (
						<div key={index}>{msg}</div>
					))}
				</div>
			</label>
		</>
	)
}


AppProvider.propTypes = {
	children: PropTypes.node
}