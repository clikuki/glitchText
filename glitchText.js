const glitchText = (() =>
{
	const glitchObjs = {};
	const charPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	// Some functions to help with random strings and numbers
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

	/**
	 * Registers node as a glitch object
	 * @param {HTMLElement} node - Node to put text in
	 * @param {Object} options - Options for glitch effect
	 * @returns {String} Key of glitch object
	 */
	const register = (node, options = {}) =>
	{
		// Make sure key is unique
		let key;
		while (!key || glitchObjs[key]) key = getRandStr(20);

		glitchObjs[key] = {
			elem: node,
			text: options.text || node.textContent,
			speed: options.speed || 10, // Depends on refresh rate of user
			chance: options.chance || 10,
		}

		return key;
	}

	/**
	 * Deletes glitch object
	 * @param {String} key - Key of glitch object
	 */
	const unregister = (key) =>
	{
		const glitchElem = glitchObjs[key];
		if (glitchElem)
		{
			// Reset text
			glitchElem.elem.textContent = glitchElem.text;
			delete glitchObjs[key];
		}
	}

	/**
	 * Gets glitch object
	 * @param {String} key - Key of glitch object
	 * @returns {Object} A glitch object
	 */
	const get = (key) => glitchObjs[key];

	/**
	 * Sets string in glitch object
	 * @param {String} key - Key of glitch object
	 * @param {String} str - Text to replace or add
	 * @param {Boolean} append - Boolean to check if str should be appended to current text
	 */
	const set = (key, str, append = false) =>
	{
		const glitchObj = glitchObjs[key]
		if (!glitchObj) return;
		if (!append) glitchObj.text = '';

		glitchObj.newText = str;
	}

	const loop = () =>
	{
		requestAnimationFrame(loop);

		for (const key in glitchObjs)
		{
			const glitchObj = glitchObjs[key];

			// run if curFrame is 0
			if (!glitchObj.curFrame)
			{
				// Add first char to text
				if (glitchObj.newText)
				{
					glitchObj.text += glitchObj.newText[0];
					glitchObj.newText = glitchObj.newText.slice(1);
				}
				else glitchObj.newText = null;

				// Replace some chars with random char
				const glitchyStr = glitchObj.text.split('').map(char =>
				{
					if (getRandInt(1, glitchObj.chance) === 1) return getRandChar();
					else return char;
				}).join('');

				glitchObj.elem.textContent = glitchyStr;
				glitchObj.curFrame = glitchObj.speed;
			}
			else --glitchObj.curFrame;
		}
	}

	// Start loop
	requestAnimationFrame(loop);

	return {
		register,
		unregister,
		get,
		set,
	}
})()
