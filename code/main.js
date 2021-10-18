'use strict'

const cards = [...document.querySelectorAll('.card')]
const timeFrames = document.querySelector('.profile__selection')

const showStats = (data, timeFrame) => {
	let context
	if (timeFrame == 'monthly') context = 'Month'
	if (timeFrame == 'weekly') context = 'Week'
	if (timeFrame == 'daily') context = 'Day'

	for (let card in cards) {
		const cardCurrentTime = cards[card].querySelector('.card__current-time')
		const cardPreviousTime = cards[card].querySelector('.card__previous-time')
		cardCurrentTime.textContent = data[card].timeframes[timeFrame].current + 'hrs'
		cardPreviousTime.textContent = `Last ${context} - ${data[card].timeframes[timeFrame].previous}hrs`
	}
}

fetch('https://raw.githubusercontent.com/Liltanie/time-tracking-dashboard/master/code/data.json')
	.then(res => res.json())
	.then(data => {
		timeFrames.addEventListener('click', e => {
			if (e.target.localName == 'a') {
				;[...timeFrames.querySelectorAll('a')].forEach(e => e.classList.remove('active'))
				e.target.classList.add('active')
				showStats(data, e.target.classList[0])
			}
		})

		// default stats to show
		showStats(data, 'weekly')
	})
	.catch(e => console.log(e))
