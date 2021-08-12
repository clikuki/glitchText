const glitchText = (() =>
{
	const glitcher = (() =>
	{
		const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

		const getRandChar = (() =>
		{
			const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			const charPoolLen = charPool.length;

			return () => charPool[getRandInt(0, charPoolLen - 1)];
		})()

		const writeTo = (node, text) => node.textContent = text;

		const replaceAtIndex = (str, replacementStr, index) => 
		{
			const start = str.substr(0, index);
			const end = str.substr(index + 1, str.length - 1);
			return start + replacementStr + end;
		}

		const start = (node, clear, glitchEnd) =>
		{
			if (clear) node.textContent = '';
			return setInterval(() =>
			{
				let string = node.textContent;

				for (const [i, char] of Object.entries(string))
				{
					if (char !== ' ')
					{
						if ((glitchEnd && +i === string.length - 1) || getRandInt(0, 6) === 0)
						{
							{
								const randChar = getRandChar();
								string = replaceAtIndex(string, randChar, +i);
							}
						}
					}
				}

				writeTo(node, string);
			}, 50);
		}

		const close = (node, interval, str) =>
		{
			clearInterval(interval);
			writeTo(node, str);
		}

		return (node, str = '', clear, glitchEnd) =>
		{
			let interval = start(node, clear, glitchEnd);
			let currString = str;

			return {
				close: () => close(node, interval, currString),

				update: (str) =>
				{
					currString = str;
					writeTo(node, str);
				},
			}
		}
	})()

	/**
	 * Makes glitchy text appear
	 * @param {HTMLElement} node - Element to write to
	 * @param {String} str - String to write
	 * @param {Number} speed - Speed for the characters to appear at
	 */
	const appear = (node, str, speed = 1) =>
	{
		let text = '';
		let i = 0;

		return new Promise(resolve =>
		{
			const glitchInstance = glitcher(node, str, true, true);
			const glitchInterval = setInterval(() =>
			{
				if (i === str.length)
				{
					clearInterval(glitchInterval);
					glitchInstance.close();
					resolve(node);
				}
				else
				{
					text += str[i];
					i++;
					glitchInstance.update(text);
				}
			}, speed * 100)
		})
	}

	/** 
	 * Makes existing text look glitchy
	 * @param {HTMLElement} node - Element to write to
	 * @returns an object with methods for updating and stopping the glitch effect
	 */
	const existing = (node) =>
	{
		let currText = node.textContent;
		const glitchInstance = glitcher(node, currText);
		const glitchInterval = setInterval(() => glitchInstance.update(currText), 40);

		return {
			update: (str) =>
			{
				currText = str;
			},
			close: () =>
			{
				clearInterval(glitchInterval);
				glitchInstance.close();
			}
		}
	}

	return {
		appear,
		existing,
	};
})()
