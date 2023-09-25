import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header(){

	const { user: {info: { name }} } = useAuth()
	const [dd, setDd] = useState(0)

	return (<div className="bg-white border-b border-slate-100 w-full px-5 py-2 flex justify-between items-center">

		<div className="flex gap-x-6 items-center">
			
			<span className="sm:hidden">
				<button className="btn btn-icon bg-transparent border-transparent text-slate-400">
					<i className="ri-menu-2-line"></i>
				</button>
			</span>

			<div className="text-slate-400 text-2xl select-none">Advanced</div>
		</div>

		<div className="flex gap-x-6 justify-end items-center">
			<div className="">
				<div className="dropdown">
					<label className="btn-toggler">
						<input type="checkbox" className="dropdown-toggler" value={dd} onChange={() => setDd(!dd)} checked={dd} />
						<span className="border-none bg-transparent text-slate-400 font-normal flex gap-x-1.5 items-center btn btn-sm whitespace-nowrap ellipsis overflow-hidden">
							<div className="bg-slate-300 text-white tracking-tight w-8 h-8 flex items-center rounded-full">
								<div className="w-full text-center">{(`${name[0]}${name[1]}`).toUpperCase()}</div>
							</div>
							<span className="text-xs">Hola {name}</span>
							<i className="ri-arrow-down-s-fill"></i>
						</span>


						<div className="dropdown-nav w-40 z-20">
							<ul className="text-sm rounded-0">
								<li>
									<NavLink to={'/profile'} onClick={() => setDd(0)}>Mi cuenta</NavLink>
								</li>
								<li>
									<NavLink to={'/logout'}>Cerrar sesión</NavLink>
								</li>
							</ul>
						</div>
					</label>

				</div>
			</div>
		</div>

	</div>)
}