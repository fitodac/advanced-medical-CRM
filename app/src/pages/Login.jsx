import { useState, useEffect } from 'react'
import { useAuth, useLogin } from '../hooks'

import { API_URI } from '../config'
import { Button, Alert } from '../components/Ui'
import {
	Loading
} from '../components'

export default function Page(){

	const [ loginForm, setLoginForm ] = useState({email: '', password: ''})
	const { user, login } = useAuth()

	useEffect(() => {
		if( user ) login(user)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		{!user 
		? (<section 
				className="bg-primary bg-[url(/background.webp)] bg-center bg-no-repeat bg-cover 
				border-b-[46px] border-secondary h-screen p-6 grid place-content-center grid-cols-1">

			<div className="col-span-1 flex justify-center">
				<div>

					{ loading && (<Loading />)}

					{ !loading &&
					(<div className="w-full max-w-xs pb-10">

						<section className="space-y-6">
							<div className="flex justify-center select-none">
								<img 
									src="/brand.png" 
									alt="Advance experts" 
									className="w-60 object-cover pointer-events-none" />
							</div>

							<form onSubmit={loginSubmit}>
								<section className="grid gap-y-3">
									
									<div className="space-y-2">
										<label className="text-white text-base font-light select-none">Email:</label>
										<input type="email" value={loginForm.email} name="email" onChange={handleInput} />
									</div>

									<div className="space-y-2">
										<label className="text-white text-base font-light select-none">Password:</label>
										<input type="password" value={loginForm.password} name="password" onChange={handleInput} />
									</div>

									<div className="pt-2">
										<Button className="bg-teal border-teal text-white w-full">Entrar</Button>
									</div>
								</section>
							</form>
						</section>



						<div className="w-full mt-10 space-y-3">
							<Button 
								className="bg-indigo-500 border-indigo-500 text-white w-full" 
								type="button" 
								onClick={() => {
									setLoginForm({email: 'house_md@local.com', password: 'cpi_1975'})
								}}>
								Entrar como doctor
							</Button>

							<Button 
								className="bg-indigo-400 border-indigo-400 text-white w-full" 
								type="button" 
								onClick={() => {
									setLoginForm({email: 'dani+admin@commonpeoplei.com', password: 'cpi_1975'})
								}}>
								Entrar como admin
							</Button>

							<Button 
								className="bg-indigo-300 border-indigo-300 text-white w-full" 
								type="button" 
								onClick={() => {
									setLoginForm({email: 'dani@commonpeoplei.com', password: 'cpi_1975'})
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