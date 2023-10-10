export const resetTime = date => {
	if (!date) return null
	const copy = new Date(date.getTime())
	copy.setHours(0, 0, 0, 0)
	return copy
}

export const getDaysDiff = (todayDate, nextDate) => {
	const [todayWithoutTime, nextWithoutTime] = [todayDate, nextDate].map(resetTime)
	const timeDifference = nextWithoutTime - todayWithoutTime
	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1
	return daysDifference
}

export const findClosestBiggerDate = (dateArray, currentDate) => {
	const futureDates = dateArray.filter((date) => date > currentDate)
	futureDates.sort((a, b) => a - b)
	return futureDates[0]
}

export const arrayContainsDate = (dateArray, date) => {
	return dateArray.some(d => resetTime(d).getTime() === resetTime(date).getTime())
}

export const getDaysFirstLetter = (date, daysFirstLetter) => {
	return daysFirstLetter[date.getDay()]
}