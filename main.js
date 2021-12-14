const stringPool = [
	'This is a demonstration!',
	'Here is some text.',
	'Pretty cool, right?',
	'Check out my github profile at "www.Github.com/Clikuki"!',
	'GLIIIIIIITCH!',
	'I gently open the door.',
	'I\'m running out of things to write',
]

const glitchedDiv = document.querySelector('#glitchedDiv');
const demoBtn = document.querySelector('#demoBtn');
const glitchKey = glitchText.register(glitchedDiv);
const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

demoBtn.addEventListener('click', () =>
{
	const randInt = getRandInt(0, stringPool.length - 1);
	const randStr = stringPool[randInt];
	glitchText.set(glitchKey, randStr);
})