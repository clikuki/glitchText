const glitchText = (() =>
{
	const glitchObjRegistry = {};
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
		while (!key || glitchObjRegistry[key]) key = getRandStr(20);

		glitchObjRegistry[key] = {
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
		const glitch = glitchObjRegistry[key];
		if (glitch)
		{
			// Reset text
			glitch.elem.textContent = glitch.text;
			delete glitchObjRegistry[key];
		}
	}

	/**
	 * Gets glitch object
	 * @param {String} key - Key of glitch object
	 * @returns {Object} A glitch object
	 */
	const get = (key) => glitchObjRegistry[key];

	/**
	 * Sets string in glitch object
	 * @param {String} key - Key of glitch object
	 * @param {String} str - Text to replace or add
	 * @param {Boolean} append - Boolean to check if str should be appended to current text
	 */
	const set = (key, str, append = false) =>
	{
		const glitch = glitchObjRegistry[key]
		if (!glitch) return;
		if (!append) glitch.deleteChars = glitch.text.length;

		glitch.newText = str;
	}

	const glitchify = (glitch) => glitch.text.split('').map(char =>
	{
		if (getRandInt(1, glitch.chance) === 1) return getRandChar();
		else return char;
	}).join('');

	const loop = () =>
	{
		requestAnimationFrame(loop);

		for (const key in glitchObjRegistry)
		{
			const glitch = glitchObjRegistry[key];

			// run if curFrame is 0
			if (!glitch.curFrame)
			{
				if (glitch.deleteChars)
				{
					--glitch.deleteChars;
					const prevText = glitch.text;
					glitch.text = prevText.slice(0, -1);
				}
				else if (glitch.newText)
				{
					glitch.text += glitch.newText[0];
					glitch.newText = glitch.newText.slice(1);
				}
				else glitch.newText = null;

				glitch.elem.textContent = glitchify(glitch);
				glitch.curFrame = glitch.speed;
			}
			else --glitch.curFrame;
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
