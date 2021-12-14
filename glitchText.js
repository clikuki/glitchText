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
	 * Unregisters node as a glitch object.
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

		glitch.textToAdd = str;
	}

	const glitchify = (text, chance) => text.split('').map(char =>
	{
		if (getRandInt(1, chance) === 1) return getRandChar();
		else return char;
	}).join('');

	const loop = () =>
	{
		requestAnimationFrame(loop);

		for (const key in glitchObjRegistry)
		{
			const glitch = glitchObjRegistry[key];
			const elem = glitch.elem;

			if (!glitch.curFrame)
			{
				if (!glitch.deleteChars)
				{
					if (glitch.textToAdd)
					{
						glitch.text += glitch.textToAdd[0];
						glitch.textToAdd = glitch.textToAdd.slice(1);
					}
					else glitch.textToAdd = null;
				}

				elem.textContent = glitchify(glitch.text, glitch.chance);
				glitch.curFrame = glitch.speed;
			}
			else glitch.curFrame--;

			if (glitch.deleteChars)
			{
				glitch.deleteChars--;
				glitch.text = glitch.text.slice(0, -1);
				elem.textContent = elem.textContent.slice(0, -1);
			}
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
