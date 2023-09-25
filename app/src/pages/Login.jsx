import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

import Button from '../components/Ui/Button'


export default function Page(){

	// Super admin
	// const [loginForm, setLoginForm] = useState({email: 'fito+advanced@commonpeoplei.com', password: 'cpi_1975'})
	// Admin
	// const [loginForm, setLoginForm] = useState({email: 'admin@local.com', password: 'cpi_1975'})
	// Doctor
	const [loginForm, setLoginForm] = useState({email: 'doctor1@local.com', password: 'advanced'})
	const { user, login } = useAuth()


	useEffect(() => {
		if( user ) login(user)
	}, [])


	const handleInput = event => {
		const {name, value} = event.target
		const form = {...loginForm}
		form[name] = value
		setLoginForm({...form})
	}


	const loginSubmit = (e) => {
		e.preventDefault()

		// console.log('auth', auth)

		axios.post('http://localhost/api/auth/login', loginForm)
		.then(async resp => {
			await login({...resp.data})
		})
		.catch(err => console.log('Error', err))
	}


	return (<>
		{ !user 
			? (<section className="bg-slate-100 h-screen p-6 grid place-content-center grid-cols-1">
				<div className="col-span-1 flex justify-center">

					<div className="w-full max-w-sm">
						<h1>Login</h1>
						<br />

						<form onSubmit={loginSubmit}>
							<section className="grid gap-y-3">
								<div className="grid gap-y-1">
									<label>Email:</label>
									<input type="email" value={loginForm.email} name="email" onChange={handleInput} />
								</div>

								<div className="grid gap-y-1">
									<label>Password:</label>
									<input type="password" value={loginForm.password} name="password" onChange={handleInput} />
								</div>

								<div className="">
									<Button className="bg-primary border-primary text-white">Entrar</Button>
								</div>
							</section>
						</form>

						<div className="text-slate-400 text-sm mt-3 space-y-1">
							<p>username: doctor1@local.com</p>
							<p>password: advanced</p>
							<p className="border-t border-slate-200"></p>
							<p>admin: admin@local.com</p>
							<p>admin: cpi_1975</p>
							<p className="border-t border-slate-200"></p>
							<p>admin: fito+advanced@commonpeoplei.com</p>
							<p>admin: cpi_1975</p>
						</div>

					</div>

				</div>
			</section>)
			: null }
		
	</>)
}