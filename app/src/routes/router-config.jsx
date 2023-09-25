import { createBrowserRouter } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from '../hooks/useAuth'

import App from '../App'
import Dashboard from '../pages/Dashboard'

import Patient, {loader as loaderPatient} from '../pages/Patients'
import PatientForm, {loader as loaderPatientForm} from '../pages/Patients/Form'
import Crd, {loader as loaderCrd} from '../pages/Patients/Crd'

import MedicalCenter, {loader as loaderCenter} from '../pages/MedicalCenters'
import MedicalCenterForm, {loader as loaderCenterForm} from '../pages/MedicalCenters/Form'

import Doctor, {loader as loaderDoctor} from '../pages/Doctors'
import DoctorForm, {loader as loaderDoctorForm} from '../pages/Doctors/Form'

import User, {loader as loaderUser} from '../pages/Users'
import UserForm, {loader as loaderUserForm} from '../pages/Users/Form'

import Login from '../pages/Login'
import Logout from '../pages/Logout'
import Profile from '../pages/Profile'

import Documents from '../pages/Documents'
import ExportData from '../pages/ExportData'

import ErrorPage from '../pages/Error404'


const router = createBrowserRouter([
	{
		path: '/',
		element: <AuthProvider>
							<ProtectedRoute>
								<App />
							</ProtectedRoute>
						</AuthProvider>,
		errorElement: <ErrorPage />,
		// action: rootAction,
		children: [
			{ index: true, element: <Dashboard /> },
			{ 
				path: '/profile', 
				element: <Profile /> 
			},
			// Users
			{
				path: '/users', 
				element: <User />,
				loader: loaderUser
			},
			{
				path: '/users/new', 
				element: <UserForm />,
				loader: loaderUserForm
			},
			{
				path: '/users/edit/:id', 
				element: <UserForm />,
				loader: loaderUserForm
			},
			// Doctors
			{
				path: '/doctors', 
				element: <Doctor />,
				loader: loaderDoctor
			},
			{
				path: '/doctors/new', 
				element: <DoctorForm />,
				loader: loaderDoctorForm
			},
			{
				path: '/doctors/edit/:id', 
				element: <DoctorForm />,
				loader: loaderDoctorForm
			},
			// Patients
			{
				path: '/patients', 
				element: <Patient />,
				loader: loaderPatient
			},
			{
				path: '/patients/new', 
				element: <PatientForm />,
				loader: loaderPatientForm
			},
			{
				path: '/patients/edit/:id', 
				element: <PatientForm />,
				loader: loaderPatientForm
			},
			{
				path: '/crd/:id/initial', 
				element: <Crd />,
				loader: loaderCrd
			},
			{
				path: '/crd/:id/first', 
				element: <Crd />,
				loader: loaderCrd
			},
			// Documents
			{
				path: '/documents', 
				element: <Documents /> 
			},
			// Medical centers
			{
				path: '/medical-centers', 
				element: <MedicalCenter />,
				loader: loaderCenter
			},
			{
				path: '/medical-centers/new', 
				element: <MedicalCenterForm />,
				loader: loaderCenterForm
			},
			{
				path: '/medical-centers/edit/:id', 
				element: <MedicalCenterForm /> ,
				loader: loaderCenterForm
			},
			// Exports
			{
				path: '/export-excel', 
				element: <ExportData /> 
			}
		]
	},

	// Login
	{
		path: '/login',
		element: <AuthProvider><Login /></AuthProvider>
	},
	
	// Logout
	{
		path: '/logout',
		element: <AuthProvider><Logout /></AuthProvider>
	}

])

export default router