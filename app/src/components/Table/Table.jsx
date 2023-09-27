import PropTypes from 'prop-types'
import { Pagination } from '.'

export const Table = ({header, children, pager}) => {
	return (<>
		<table className="table table-striped hoverable">

			<thead>
				{ header && header.map(e => (<th key={e.title}>
					<div className={e.class}>{e.title}</div>
				</th>))}
			</thead>

			<tbody>
				{ children }
			</tbody>

		</table>

		{pager && (<Pagination links={pager} />)}
	</>)
}


Table.propTypes = {
	header: PropTypes.array.isRequired,
	children: PropTypes.node.isRequired,
	pager: PropTypes.array
}