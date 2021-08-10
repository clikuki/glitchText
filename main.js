const glitchText = (() =>
{
	const letters = 'abcdefghijklmnopqrstuv';
	const nums = '0123456789';
	const glitchRange = [5, 10];

	const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

	const writeTo = (node, text) => node.textContent = text;

	/**
	 * @param {HTMLElement} elem - Element to write to
	 * @param {String} text - String to write
	 * @param {Number} speed - Speed to write at (in 1/10 of a second)
	 */
	return (elem, text, speed = 1) =>
	{
		return new Promise(resolve =>
			{
				let currText = '';
				let i = 0;
		
				const logic = () =>
				{
					if(i === text.length) 
					{
						clearInterval(logicInterval);
						resolve(elem);
					}
					else
					{
						let currChar = text[i];
						currText += currChar;
		
						if(currChar === ' ')
						{
							i++;
							currText += text[i];
						}
						
						i++;

						if(i !== text.length)
						{
							let j = 0;
							const writeInterval = setInterval(() =>
							{
								if(j === 9)
								{
									clearInterval(writeInterval);
								}
								else
								{
									const randChar = letters[randInt(...glitchRange)];
									writeTo(elem, currText + randChar);
									j++;
								}
							}, speed * 10)
						}
						else
						{
							writeTo(elem, currText);
						}
					}
				}
		
				const logicInterval = setInterval(logic, speed * 100);
			})
	}
})()

const node = document.querySelector('#glitchDiv');