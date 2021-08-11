const glitchText = (() =>
{
	const glitcher = (() =>
	{
		let currString = '';
		let currNode;
		let interval;
	
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
	
		const clearVars = () =>
		{
			currNode = undefined;
			currString = undefined;
		}
	
		const start = (node, str = '') =>
		{
			currNode = node;
			currString = str;
			node.textContent = str;
	
			interval = setInterval(() =>
			{
				const currText = node.textContent;
				const randChar = getRandChar();
				const newText = currText.slice(0, -1) + randChar;
	
				writeTo(node, newText);
			}, 20);
		}
	
		const close = () =>
		{
			clearInterval(interval);
			writeTo(currNode, currString);
			clearVars();
		}
	
		const update = (str) =>
		{
			currString = str;
			writeTo(currNode, str);
		}
	
		return {
			start,
			close,
			update,
		}
	})()

	return (node, str, speed = 1) =>
	{
		let text = '';
		let i = 0;

		glitcher.start(node)
		const glitchInterval = setInterval(() =>
		{
			if(i === str.length)
			{
				clearInterval(glitchInterval);
				glitcher.close();
			}
			else
			{
				text += str[i];
				i++;
				glitcher.update(text);
			}
		}, speed * 100)
	}
})()

const node = document.querySelector('#glitchDiv');
