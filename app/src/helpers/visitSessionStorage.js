export const visitSessionStorage = {
	
	get: type => {
		return JSON.parse(window.localStorage.getItem(`advance_visit_${type}`))
	},
	
	set: (type, form) => {
		return window.localStorage.setItem(`advance_visit_${type}`, JSON.stringify(form))
	},
	
	remove: type => {
		return window.localStorage.removeItem(`advance_visit_${type}`)
	}

}