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
	<section className="border border-slate-100 p-3 rounded-md">
		<table className="table table-striped hoverable">

			{ header && 
			(<thead>
				<tr>
					{ header.map(e => (<th key={e.title} className="text-slate-400 text-sm">
						<div className={e.class}>{e.title}</div>
					</th>)) }
				</tr>
			</thead>) }
			

			<tbody>
				{ children }
			</tbody>

		</table>

		{pager && (<Pagination links={pager} context={context} />)}
	</section>
	</>)
})



Table.propTypes = {
	header: PropTypes.array,
	children: PropTypes.node.isRequired,
	pager: PropTypes.array,
	context: PropTypes.object.isRequired
}