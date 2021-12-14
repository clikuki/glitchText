const glitchText = (() =>
{
	const nodes = {};
	const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
	const getRandChar = () => charPool[getRandInt(0, charPool.length - 1)];
	const getRandStr = (len) =>
	{
		let str = '';

		for (let i = 0; i < len; i++)
		{
			str += getRandChar();
		}

		return str;
	}

	const register = (node) =>
	{
		const key = getRandStr(20);

		nodes[key] = {
			elem: node,
			text: node.textContent,
		}

		return key;
	}

	const unregister = (key) =>
	{
		if (nodes[key]) delete nodes[key];
	}

	const set = (key, str, charSpeed) =>
	{
		const node = nodes[key]
		if (node)
		{
			node.text = str;

			// if(charSpeed) 
			// else 
			node.elem.textContent = str;
		}
	}

	const mainLoop = () =>
	{
		requestAnimationFrame(mainLoop);

		for (const key in nodes)
		{
			const { elem, text } = nodes[key];
			const glitchyStr = text.split('').map(char =>
			{
				if (getRandInt(0, 10) <= 5) return getRandChar();
				else return char;
			})
				.join('');

			elem.textContent = glitchyStr;
		}
	}

	// Start loop
	requestAnimationFrame(mainLoop);

	return {
		register,
		unregister,
		set,
	}
})()

// const glitcher = (() =>
// {
// 	const getRandInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// 	const getRandChar = (() =>
// 	{
// 		const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// 		const charPoolLen = charPool.length;

// 		return () => charPool[getRandInt(0, charPoolLen - 1)];
// 	})()

// 	const writeTo = (node, text) => node.textContent = text;

// 	const replaceAtIndex = (str, replacementStr, index) => 
// 	{
// 		const start = str.substr(0, index);
// 		const end = str.substr(index + 1, str.length - 1);
// 		return start + replacementStr + end;
// 	}

// 	const start = (node, clear, glitchEnd) =>
// 	{
// 		if (clear) node.textContent = '';
// 		return setInterval(() =>
// 		{
// 			let string = node.textContent;

// 			for (const [i, char] of Object.entries(string))
// 			{
// 				if (char !== ' ')
// 				{
// 					if ((glitchEnd && +i === string.length - 1) || getRandInt(0, 6) === 0)
// 					{
// 						{
// 							const randChar = getRandChar();
// 							string = replaceAtIndex(string, randChar, +i);
// 						}
// 					}
// 				}
// 			}

// 			writeTo(node, string);
// 		}, 50);
// 	}

// 	const close = (node, interval, str) =>
// 	{
// 		clearInterval(interval);
// 		writeTo(node, str);
// 	}

// 	return (node, str = '', clear, glitchEnd) =>
// 	{
// 		let interval = start(node, clear, glitchEnd);
// 		let currString = str;

// 		return {
// 			close: () => close(node, interval, currString),

// 			update: (str) =>
// 			{
// 				currString = str;
// 				writeTo(node, str);
// 			},
// 		}
// 	}
// })()
