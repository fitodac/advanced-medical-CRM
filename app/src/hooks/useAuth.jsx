import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'

const AuthContext = createContext('')


export const AuthProvider = ({children}) => {

	const [user, setUser] = useLocalStorage('user', null)
	const navigate = useNavigate()

	// call this function when you want to authenticate the user
	const login = async (data) => {
		setUser(data)
		if (navigate) navigate('/')
	}


	// call this function to sign out logged in user
	const logout = () => {
		setUser(null)
		window.localStorage.removeItem('user')
		if (navigate) navigate('/login', { replace: true })
	}


	const value = useMemo(
		() => ({
			user,
			login,
			logout
		}),
		[user]
	)

	if(!value) return null
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}


export const useAuth = () => useContext(AuthContext)


// This evaluates if the user is autenticated,
// if not, the function return false.
export const kickOut = resp => {
	const { statusText, message } = resp
	if( 'Unauthorized' === statusText && 'Unauthenticated.' === message ){
		window.localStorage.removeItem('user')
		return true
	}else{
		return false
	}
}