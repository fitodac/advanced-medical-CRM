import { useState, useEffect } from 'react'
import { useAuth, useLogin } from '../hooks'

import { API_URI } from '../config.dev'
import { Button, Alert } from '../components/Ui'




export default function Page(){

	const [ loginForm, setLoginForm ] = useState({email: '', password: ''})
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

	const { error, loading, formLogin } = useLogin({
		url: `${API_URI}/auth/login`,
		body: loginForm
	})

	const loginSubmit = async (e) => {
		e.preventDefault()
		await formLogin()
	}



	return (<>
		{ !user 
			? (<section className="bg-slate-100 h-screen p-6 grid place-content-center grid-cols-1">


				<div className="col-span-1 flex justify-center">
					<div>

						{ loading && (<div>cargando...</div>)}

						{ !loading &&
						(<div className="w-full max-w-sm pb-10">
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

							<div className="w-full mt-5 space-y-3">
								<Button 
									className="bg-indigo-500 border-indigo-500 text-white w-full" 
									type="button" 
									onClick={() => {
										setLoginForm({email: 'doctor1@local.com', password: 'advanced'})
									}}>
									Entrar como doctor
								</Button>

								<Button 
									className="bg-indigo-400 border-indigo-400 text-white w-full" 
									type="button" 
									onClick={() => {
										setLoginForm({email: 'admin@local.com', password: 'cpi_1975'})
									}}>
									Entrar como admin
								</Button>

								<Button 
									className="bg-indigo-300 border-indigo-300 text-white w-full" 
									type="button" 
									onClick={() => {
										setLoginForm({email: 'fito+advanced@commonpeoplei.com', password: 'cpi_1975'})
									}}>
									Entrar como superadmin
								</Button>
							</div>

						</div>)}

						{ !loading && error && <Alert type="error" data={error} /> }

					</div>
				</div>
			</section>)
			: null }
		
	</>)
}