export const dateFormat = date => new Intl.DateTimeFormat('es', {dateStyle: 'medium'}).format(new Date(date))