import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const itemClassName = `text-slate-500 text-[15px]`
const itemActiveClassName = `text-primary text-[15px]`

export default function Navbar(){

	const { user } = useAuth()
	const { role } = user.info

  return <nav className="">
					<ul className="text-sm p-6 space-y-4 select-none">
						<li>
							<NavLink to={'/'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Dashboard</NavLink>
						</li>

						{ ('admin' === role || 'superadmin' === role) 
						? (<>
							<li>
								<NavLink to={'/doctors'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Doctores</NavLink>
							</li>
						</>)
						: null }

						<li>
							<NavLink to={'/patients'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Pacientes</NavLink>
						</li>
						


						{ ('admin' === role || 'superadmin' === role) 
						? (<>
							<li>
								<NavLink to={'/medical-centers'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Centros médicos</NavLink>
							</li>
						</>)
						: null }


						{ ('superadmin' === role) 
						? (<>
							<li>
								<NavLink to={'/users'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Usuarios</NavLink>
							</li>
						</>)
						: null }

						<li>
							<NavLink to={'/documents'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Documentos</NavLink>
						</li>

						{ 'superadmin' === role 
						? (<li>
								<NavLink to={'/export-excel'} className={({isActive}) => isActive ? itemActiveClassName : itemClassName}>Exportar datos</NavLink>
							</li>)
						: null }

					</ul>
				</nav>
}