// Function to remove time from a date object so we only compare the date
export const resetTime = date => {
	if (!date) return null
	const copy = new Date(date.getTime())
	copy.setHours(0, 0, 0, 0)
	return copy
}

// Function to retrieve the number of days between today and the next date
export const getDaysDiff = (todayDate, nextDate) => {
	const [todayWithoutTime, nextWithoutTime] = [todayDate, nextDate].map(resetTime)
	const timeDifference = nextWithoutTime - todayWithoutTime
	const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)) - 1
	return daysDifference
}

// Function to find the closest future date from an array of dates
export const findClosestBiggerDate = (dateArray, currentDate) => {
	const futureDates = dateArray.filter((date) => date > currentDate)
	futureDates.sort((a, b) => a - b)
	return futureDates[0]
}

// Function to check if a date is included in an array of dates
export const arrayContainsDate = (dateArray, date) => {
	return dateArray.some(d => resetTime(d).getTime() === resetTime(date).getTime())
}

// Function to return the first letter of the weekday of a given date
export const getDaysFirstLetter = (date, daysFirstLetter) => {
	return daysFirstLetter[date.getDay()]
}