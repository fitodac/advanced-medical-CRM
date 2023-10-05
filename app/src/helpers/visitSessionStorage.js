export const visitSessionStorage = {
	
	get: type => {
		return JSON.parse(window.sessionStorage.getItem(`advanced_visit_${type}`))
	},
	
	set: (type, form) => {
		return window.sessionStorage.setItem(`advanced_visit_${type}`, JSON.stringify(form))
	},
	
	remove: type => {
		return window.sessionStorage.removeItem(`advanced_visit_${type}`)
	}

}