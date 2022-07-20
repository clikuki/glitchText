const glitchText = (() => {
	const glitchObjRegistry = {};
	const charPool =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	// Some functions to help with random strings and numbers
	const getRandInt = (min, max) =>
		Math.floor(Math.random() * (max - min + 1) + min);
	const getRandChar = () => charPool[getRandInt(0, charPool.length - 1)];

	/**
	 * Registers node as a glitch object
	 * @param {HTMLElement} node - Node to put text in
	 * @param {Object} options - Options for glitch effect
	 * @returns {Symbol} the key of the glitch object
	 */
	function register(node, options = {}) {
		const key = Symbol();

		glitchObjRegistry[key] = {
			elem: node,
			text: options.text || node.textContent,
			speed: options.speed || 10, // Depends on refresh rate of user
			chance: options.chance || 10,
		};

		return key;
	}

	/**
	 * Unregisters node as a glitch object.
	 * @param {Symbol} key - Key of glitch object
	 */
	function unregister(key) {
		const glitch = glitchObjRegistry[key];
		if (glitch) {
			// Reset text
			glitch.elem.textContent = glitch.text;
			delete glitchObjRegistry[key];
		}
	}

	/**
	 * Gets glitch object
	 * @param {Symbol} key - Key of glitch object
	 * @returns {Object} A glitch object
	 */
	function get(key) {
		return glitchObjRegistry[key];
	}

	/**
	 * Sets string in glitch object
	 * @param {Symbol} key - Key of glitch object
	 * @param {String} str - Text to replace or add
	 * @param {Boolean} append - Boolean to check if str should be appended to current text
	 */
	function set(key, str, append = false) {
		const glitch = glitchObjRegistry[key];
		if (!glitch) return;
		if (!append) glitch.deleteChars = glitch.text.length;

		glitch.textToAdd = str;
	}

	function glitchify(text, chance) {
		return text
			.split('')
			.map((char) => {
				if (getRandInt(1, chance) === 1) return getRandChar();
				else return char;
			})
			.join('');
	}

	(function loop() {
		requestAnimationFrame(loop);

		for (const key of Object.getOwnPropertySymbols(glitchObjRegistry)) {
			const glitch = glitchObjRegistry[key];
			const elem = glitch.elem;

			if (!glitch.curFrame) {
				if (!glitch.deleteChars) {
					if (glitch.textToAdd) {
						glitch.text += glitch.textToAdd[0];
						glitch.textToAdd = glitch.textToAdd.slice(1);
					} else glitch.textToAdd = null;
				}

				elem.textContent = glitchify(glitch.text, glitch.chance);
				glitch.curFrame = glitch.speed;
			} else glitch.curFrame--;

			if (glitch.deleteChars) {
				glitch.deleteChars--;
				glitch.text = glitch.text.slice(0, -1);
				elem.textContent = elem.textContent.slice(0, -1);
			}
		}
	})();

	return {
		register,
		unregister,
		get,
		set,
	};
})();
