import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export const useCreateNewPatient = ({
	API_URI = '',
	user_id,
	token
}) => {

	const [createNewPatientLoading, setCreateNewPatientLoading] = useState(false)

	const navigate = useNavigate()

	const createNewPatient = async () => {

		setCreateNewPatientLoading(true)

		const doctorData = await axios.post(
			`${API_URI}/doctor/getInfo`,
			{id: user_id},
			{
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}
		).then(resp => {
			const {doctor: {
							id: doctor_id, 
							center_id, 
							center:{code}
						}} = resp.data.data

			return {doctor_id, center_id, code}
		})

		axios.post(
			`${API_URI}/patient/create`,
			doctorData,
			{
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
					Accept: 'application/json',
					'Access-Control-Allow-Origin': '*'
				}
			}
		).then(resp => navigate(`/crd/${resp.data.data.id}/crd`))

	}

	return {
		createNewPatientLoading,
		createNewPatient
	}

}