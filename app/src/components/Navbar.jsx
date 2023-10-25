import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const itemClassName = `text-white text-opacity-60 text-[15px] pl-6 py-2 block hover:text-opacity-80`
const itemActiveClassName = `border-r-4 border-r-white text-white text-[15px] pl-6 py-2 block 
															before:content-['•'] before:relative before:-left-1 before:-ml-2 before:opacity-40`

export const Navbar = () => {

	const { user } = useAuth()
	const { role } = user.info

  return (<nav className="">

		<div className="px-6 pt-3 pb-10">
			<NavLink to="/">
				<img 
					src="/brand.webp" 
					alt="Advanced experts" 
					className="w-40 object-cover pointer-events-none" />
			</NavLink>
		</div>

		<ul className="text-sm pb-6 select-none">
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
	</nav>)
}