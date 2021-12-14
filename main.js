const stringPool = [
	'placeholder placeholder placeholder',
	'Look at my library!',
	'BOOOOOOO!',
	'This is a demonstration!',
	'Here is some text.',
	'Here is some more text.',
	'Pretty cool, right?',
	'Check out my github profile at "www.Github.com/Clikuki"!',
	'GLIIIIIIITCH!',
	'I gently open the door.',
	'I\'m running out of things to write.',
]

const glitchDiv = document.querySelector('#glitchedDiv');
const demoBtn = document.querySelector('#demoBtn');
const glitchKey = glitchText.register(glitchDiv, {
	speed: 3,
});

const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

demoBtn.addEventListener('click', () =>
{
	const randIndex = getRandInt(0, stringPool.length - 1);
	const randStr = stringPool[randIndex];
	glitchText.set(glitchKey, randStr);
})