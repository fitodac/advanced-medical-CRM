import React from 'react'
import PropTypes from 'prop-types'
import { Pagination } from '.'

export const Table = React.memo( function Table({
  header, 
  children, 
  pager,
  context
}){
	return (<>
		<table className="table table-striped hoverable">

			{ header && 
			(<thead>
				<tr>
					{ header.map(e => (<th key={e.title} className="text-slate-700">
						<div className={e.class}>{e.title}</div>
					</th>)) }
				</tr>
			</thead>) }
			

			<tbody>
				{ children }
			</tbody>

		</table>

		{pager && (<Pagination links={pager} context={context} />)}
	</>)
})



Table.propTypes = {
	header: PropTypes.array,
	children: PropTypes.node.isRequired,
	pager: PropTypes.array,
	context: PropTypes.object.isRequired
}