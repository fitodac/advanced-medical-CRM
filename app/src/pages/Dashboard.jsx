import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PageHeader } from '../components'

const boxClassName = `bg-white border boder-slate-100 px-7 py-4 space-y-1 select-none transition-all rounded-md 
											hover:bg-teal hover:border-teal hover:text-white`

export default function Page(){

	const { user } = useAuth()
	const { role } = user.info

	return (<>
		<PageHeader title="Dashboard" breadcrumbs={[]} />

		<section className="w-full overflow-x-hidden pt-5">
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8">

				<NavLink to={'/patients'} className={boxClassName}>
					<div className="font-bold">Pacientes</div>
					<div className="text-sm font-light leading-tight">Accede al listado de todos los pacientes registrados</div>
				</NavLink>

				{ 'superadmin' === role && (
					<NavLink to={'/users'} className={boxClassName}>
						<div className="font-bold">Usuarios</div>
						<div className="text-sm font-light leading-tight">Administra los usuarios registrados tanto Doctores como Administradores</div>
					</NavLink>
				)}

				{ 'admin' === role && (
					<NavLink to={'/users'} className={boxClassName}>
						<div className="font-bold">Doctores</div>
						<div className="text-sm font-light leading-tight">Un listado de todos los doctores registrados</div>
					</NavLink>
				)}

				{ 'doctor' !== role && (
					<NavLink to={'/medical-centers'} className={boxClassName}>
						<div className="font-bold">Centros médicos</div>
						<div className="text-sm font-light leading-tight">Aquí podrás administrar los diferentes centros médicos con los que contamos</div>
					</NavLink>
				)}

				<NavLink to={'/documents'} className={boxClassName}>
					<div className="font-bold">Documentos</div>
					<div className="text-sm font-light leading-tight">Contamos con documentos disponibles para descargar en formato digital</div>
				</NavLink>

			</div>
		</section>
	</>)
}