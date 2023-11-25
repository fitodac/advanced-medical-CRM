import { useEffect, useState } from 'react'
import { Button } from '../components/Ui'
import { NavLink } from 'react-router-dom'
import { useAxios } from '../hooks'
import { API_URI } from '../config'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }) {
	return { ...params }
}

export default function ResetPasswordPage() {
	const [data, setData] = useState({
		password: '',
		password_confirmation: '',
	})
	const { email, token } = useLoaderData()

	const [loading, setLoading] = useState(false)
	const [validation, setValidation] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
		setValidation({})
		error.status = null
	}

	const {
		response,
		error,
		// loading: formLoading,
		refetch,
	} = useAxios({
		url: `${API_URI}/auth/reset-password`,
		method: 'POST',
		body: { ...data, token, email },
		init: 0,
	})

	useEffect(() => {
		if (422 === error.status) setValidation(error.message)
	}, [error])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			await refetch()
			setLoading(false)
		} catch (err) {
			setLoading(false)
			console.log('error', err)
		}
	}

	if (email && token) {
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
									<>
										<form
											onSubmit={handleSubmit}
											className={`transition-all ${
												loading ? 'opacity-30 pointer-events-none' : ''
											}`}
										>
											<section className="grid pt-4">
												<div className="text-white text-2xl font-light">
													Reiniciar contraseña
												</div>

												<div className="space-y-2 mt-2">
													<label className="text-white text-sm font-light">
														Contraseña
													</label>
													<input
														type="password"
														value={data.password}
														onChange={handleChange}
														name="password"
														autoComplete="off"
													/>
												</div>

												<div className="space-y-2 mt-2">
													<label className="text-white text-sm font-light">
														Confirmar contraseña
													</label>
													<input
														type="password"
														value={data.password_confirmation}
														onChange={handleChange}
														name="password_confirmation"
														autoComplete="off"
													/>
												</div>

												<div className="pt-5">
													<Button className="bg-teal border-teal text-white w-full">
														Olvidé mi contraseña
													</Button>
												</div>
											</section>

											{422 === error.status && validation.password && (
												<div className="space-y-2 pt-5">
													{validation.password.map((e) => (
														<div className="text-sm text-red-400" key={e}>
															{e}
														</div>
													))}
												</div>
											)}

											{400 === error.status && (
												<div className="space-y-2 pt-5">
													<div className="text-sm text-red-400">
														{error.message}
													</div>
												</div>
											)}
										</form>
									</>
								) : (
									<div className="text-white text-center">
										{response.message}
										<p className="">
											<NavLink to="/login" className="underline">
												Haz click aquí
											</NavLink>{' '}
											para continuar
										</p>
									</div>
								)}
							</section>
						</div>
					</div>
				</div>
			</section>
		)
	} else {
		return null
	}
}
