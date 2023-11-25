import { useState } from 'react'
import { Button } from '../components/Ui'
import { NavLink } from 'react-router-dom'
import { useAxios } from '../hooks'
import { API_URI } from '../config'

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

export default function ForgotPasswordPage() {
	const [data, setData] = useState({ email: '' })
	const [loading, setLoading] = useState(false)
	const [validEmail, setValidEmail] = useState(null)

	const handleChange = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
		setValidEmail(null)
	}

	const {
		response,
		error,
		// loading: formLoading,
		refetch,
	} = useAxios({
		url: `${API_URI}/auth/forgot-password`,
		method: 'POST',
		body: { email: data.email },
		init: 0,
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		const valid_email = validateEmail(data.email)

		// Validate email
		if (!valid_email) return setValidEmail(false)

		try {
			await refetch()
			setLoading(false)
		} catch (err) {
			setLoading(false)
			console.log('error', err)
		}
	}

	return (
		<section
			className="bg-primary bg-[url(/background.webp)] bg-center bg-no-repeat bg-cover 
			border-b-[46px] border-secondary h-screen p-6 grid place-content-center grid-cols-1"
		>
			<div className="col-span-1 flex justify-center">
				<div>
					<div className="w-full max-w-xs pb-10">
						<section className="space-y-6">
							<div className="flex justify-center select-none">
								<img
									src="/brand.png"
									alt="Advance experts"
									className="w-60 object-cover pointer-events-none"
								/>
							</div>

							{!response?.success ? (
								<form
									onSubmit={handleSubmit}
									className={`transition-all ${
										loading ? 'opacity-30 pointer-events-none' : ''
									}`}
								>
									<section className="grid gap-y-3 pt-4">
										<div className="text-white leading-tight">
											Ingresa tu dirección de email y te enviaremos un correo
											para que puedas reiniciar tu contraseña.
										</div>

										<div className="space-y-2 mt-2">
											<input
												type="text"
												value={data.email}
												name="email"
												onChange={handleChange}
												autoComplete="off"
											/>

											{false === validEmail && (
												<div className="text-sm text-red-400">
													Debes ingresar un email válido
												</div>
											)}

											{error && 422 === error.status && (
												<div className="text-sm text-red-400">
													{error.message}
												</div>
											)}
										</div>

										<div className="pt-2">
											<Button className="bg-teal border-teal text-white w-full">
												Olvidé mi contraseña
											</Button>
										</div>

										<div className="text-center mt-6 select-none">
											<NavLink
												to="/login"
												className="text-white text-sm transition-all hover:underline"
											>
												Cancelar
											</NavLink>
										</div>
									</section>
								</form>
							) : (
								<div className="text-white text-center">{response.message}</div>
							)}
						</section>
					</div>
				</div>
			</div>
		</section>
	)
}
