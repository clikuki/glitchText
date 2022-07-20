# GlitchText.js

A small library that makes text look glitchy!

[Demonstration here!](https://clikuki.github.io/glitchText/)

Note: monospace fonts work best as the non-monospace characters have different widths and cause the paragraph change size

# Quick setup

1. Download glitchText.js and link it to your HTML file

```HTML
<!-- use the original file -->
<script src="./lib/glitchText.js"></script>
<!-- Or use the minified file -->
<script src="./lib/glitchText.min.js"></script>
```

2. Use glitchText.register to turn an element glitchy

```js
Const key = glitchText.register(node, options)
```

3. Use glitchText.set to set text

```js
Const key = glitchText.register(node, options)
glitchText.set(key, str)
```

5. Watch as glitchy text appears!

# Methods

## `glitchText.Register(node, options)`

Registers node as a glitch object.

##### Arguments:

`node` - Node to put text in  
`options` - Options for glitch effect  
`options.text` - starting text  
`options.speed` - speed of glitch effect  
`options.chance` - chance of character to be glitched _(1 / chance)_

##### Returns:

The key of the glitch obj, used in other glitchText methods

## `glitchText.unregister(node, options)`

Unregisters node as a glitch object.

##### Arguments:

`key` - A string representing the key of the glitch object

## `glitchText.get(key)`

Gets glitch object.

##### Arguments:

`key` - A string representing the key of the glitch object

##### Returns:

The glitch obj

## `glitchText.set(key)`

Sets string in glitch object

##### Arguments:

`key` - A string representing the key of the glitch object  
`str` - Text to replace or add  
`append` - Boolean to check if str should be appended to current text
