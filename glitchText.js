const glitchText = (() =>
{
	const glitcher = (() =>
	{
		const getRandChar = (() =>
		{
			const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			const nums = '0123456789';
			const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

			return () => 
			{
				const charPool = getRandInt(0, 1) === 1 ? letters : nums;
				const randChar = charPool[getRandInt(0, charPool.length - 1)];

				return randChar;
			}
		})()

		const writeTo = (node, text) => node.textContent = text;

		const start = (node) =>
		{
			node.textContent = '';
			return setInterval(() =>
			{
				const currText = node.textContent;
				const randChar = getRandChar();
				const newText = currText.slice(0, -1) + randChar;

				writeTo(node, newText);
			}, 20);
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
