import queryString from 'query-string'
import { useAxios } from '../hooks'
import { API_URI } from '../config'

import { ButtonLink } from '../components/Ui'
import { Loading } from '../components'
import { useEffect, useState } from 'react'

const _s = queryString.parse(location.search)
const token = _s?.token


export default function VerifyAccount(){

	// const [loading, setLoading ] = useState(false)

	const {
		response,
		error,
		loading,
		refetch
	} = useAxios({
		url: `${API_URI}/account/verify/${token ?? ''}`,
		method: 'GET'
	})

	// useEffect(() => {
	// 	setLoading(fetchLoading)
	// }, [fetchLoading])


	return (
		<>
			{!loading && (
			<div className="bg-slate-100 w-screen h-screen p-6 grid grid-cols-1 place-content-center">
				<div className="col-span-1">
					<div className="bg-white text-slate-500 text-center max-w-md px-8 py-14 mx-auto shadow lg:max-w-xl">

						{response.success && (
						<>
							<div className="">{ response.message }</div>

							<div className="mt-5">
								<ButtonLink
									link="/"
									className="bg-teal border-teal text-white">
									<span className="px-4">Entrar</span>
								</ButtonLink>
							</div>
						</>
						)}

						{!response.success && error && (
						<>
							<div className="">{ error.message }</div>
						</>
						)}

					</div>
				</div>
			</div>
			)}

			{loading && (<Loading />)}
		</>
	)
}