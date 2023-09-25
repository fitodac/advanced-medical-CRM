import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'


export default function Page(){
	const { user, logout } = useAuth()
	useEffect(() => { if( user ) logout(user) }, [])
	return null;
}