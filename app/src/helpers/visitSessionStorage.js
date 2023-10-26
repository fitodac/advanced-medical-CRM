export const visitSessionStorage = {
	
	get: type => {
		return JSON.parse(window.sessionStorage.getItem(`advance_visit_${type}`))
	},
	
	set: (type, form) => {
		return window.sessionStorage.setItem(`advance_visit_${type}`, JSON.stringify(form))
	},
	
	remove: type => {
		return window.sessionStorage.removeItem(`advance_visit_${type}`)
	}

}