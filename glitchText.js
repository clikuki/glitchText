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

		const start = (node) =>
		{
			node.textContent = '';
			return setInterval(() =>
			{
				let string = node.textContent;

				for (const [i, char] of Object.entries(string))
				{
					if (char !== ' ')
					{
						if (+i === string.length - 1 || getRandInt(0, 6) === 0)
						{
							{
								const randChar = getRandChar();
								string = replaceAtIndex(string, randChar, +i);
							}
						}
					}
				}

				// console.log(string);
				writeTo(node, string);
			}, 50);
		}

		const close = (node, interval, str) =>
		{
			clearInterval(interval);
			writeTo(node, str);
		}

		return (node, str = '') =>
		{
			let interval = start(node);
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

	return (node, str, speed = 1) =>
	{
		let text = '';
		let i = 0;

		let glitchInstance = glitcher(node, str);
		const glitchInterval = setInterval(() =>
		{
			if (i === str.length)
			{
				clearInterval(glitchInterval);
				glitchInstance.close();
			}
			else
			{
				text += str[i];
				i++;
				glitchInstance.update(text);
			}
		}, speed * 100)
	}
})()
