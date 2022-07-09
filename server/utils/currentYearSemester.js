const currentDate = new Date()
export const currentSem = currentDate.getMonth() < 6 ? 2 : 1
export const currentYear = currentSem === 1 ? currentDate.getFullYear() : currentDate.getFullYear() - 1
export const isCurrentSemMod = (modId) => {
	const [code, year, sem] = modId.split('-')
	return year === currentYear && sem === currentSem
}