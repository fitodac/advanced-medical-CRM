import PropTypes from 'prop-types'
import { Button } from '../../components/Ui'
import { useContext } from 'react'

const btnClassName = {
	btn: `border-none text-base w-10 h-10 p-0 grid place-content-center select-none rounded transition-all group hover:bg-primary hover:text-white`,
	disabled: `bg-transparent border-transparent text-slate-300 text-base w-10 h-10 p-0 grid place-content-center select-none rounded transition-all group cursor-default`,
	arrowLeft: `ri-arrow-left-s-line relative transition-all`,
	arrowLeftHover: `group-hover:-ml-2`,
	arrowRight: `ri-arrow-right-s-line relative transition-all`,
	arrowRightHover: `group-hover:ml-2`
}


export const Pagination = ({
	links,
	context
}) => {

	const first = [...links].shift()
	const last = [...links].pop()
	const pager = [...links]
	pager.shift()
	pager.pop()

	const pageContext = useContext(context)

	const navigate = url => {
		if( url ) pageContext.requestUpdate(url)
	}

	return (<div className="pt-3">
		<div className="flex gap-x-1 overflow-x-hidden justify-end">

			<Button 
				className={first.url ? btnClassName.btn : btnClassName.disabled}
				onClick={() => navigate(first.url)}>
				<i className={`${btnClassName.arrowLeft} ${first.url && btnClassName.arrowLeftHover}`} />
			</Button>

			{ pager.length && pager.map(({url, label, active}) => (
				<Button 
					className={active ? btnClassName.disabled : btnClassName.btn} 
					key={url}
					onClick={() => navigate(url)}>
					{label}
				</Button>))}

			<Button 
				className={last.url ? btnClassName.btn : btnClassName.disabled} disabled={!last.url}
				onClick={() => navigate(last.url)}>
				<i className={`${btnClassName.arrowRight} ${last.url && btnClassName.arrowRightHover}`} />
			</Button>

		</div>
	</div>)
}


Pagination.propTypes = {
	links: PropTypes.array.isRequired,
	context: PropTypes.object.isRequired
}