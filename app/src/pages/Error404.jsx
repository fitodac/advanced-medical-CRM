import { useNavigate } from 'react-router-dom'

export default function Page(){

	const navigate = useNavigate()
	const historyBack = () => navigate(-1)

	return (<div className="bg-slate-50 w-screen h-screen grid place-content-center">
		<div className="text-center">
			<div className="text-slate-400 font-bold">
				<div className="text-3xl">ERROR</div>
				<div className="text-9xl">404</div>
				<div className="">No hemos encontrado la página que buscabas.</div>
				<div className="mt-7">
					<button onClick={historyBack} className="space-x-2 transition-all select-none hover:text-primary">
						<i className="ri-arrow-left-line"></i>
						<span>Volver</span>
					</button>
				</div>
			</div>
		</div>
	</div>)
}