function hexToHSL(hex) {
	hex = hex.replace(/^#/, '');
	if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');

	const r = parseInt(hex.slice(0, 2), 16) / 255;
	const g = parseInt(hex.slice(2, 4), 16) / 255;
	const b = parseInt(hex.slice(4, 6), 16) / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}

	return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
	s /= 100; l /= 100;
	h = ((h % 360) + 360) % 360; // normalize

	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs((h / 60) % 2 - 1));
	const m = l - c / 2;
	let r = 0, g = 0, b = 0;

	if (h < 60) [r, g, b] = [c, x, 0];
	else if (h < 120) [r, g, b] = [x, c, 0];
	else if (h < 180) [r, g, b] = [0, c, x];
	else if (h < 240) [r, g, b] = [0, x, c];
	else if (h < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];

	const toHex = v => Math.round((v + m) * 255).toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// --- Comfort-oriented dark mode transform ---

// Smoothstep-based compression: pulls lightness toward the midpoint,
// reducing contrast at both extremes instead of linearly remapping.
function compressLightness(l, center = 45, strength = 0.6) {
	// strength: 0 = no compression, 1 = fully collapsed to center
	const normalized = l - center;       // distance from center, -center..(100-center)
	const compressed = normalized * (1 - strength);
	return center + compressed;
}

// Extra desaturation weighting for blue/cyan hues (~190°-260°),
// which are most associated with eye strain and glare at night.
function hueAwareDesaturation(h, s, baseFactor = 0.55) {
	const isBlueish = h >= 190 && h <= 260;
	const extraCut = isBlueish ? 0.25 : 0; // additional reduction for blues
	return s * (baseFactor - extraCut > 0 ? baseFactor - extraCut : baseFactor * 0.5);
}

// Slight warm shift for blue hues, similar to blue-light filtering.
function warmHueShift(h) {
	if (h >= 190 && h <= 260) {
		return h - 8; // nudge toward violet/cyan-green, away from pure blue
	}
	return h;
}

export function toDarkMode(hex, options = {}) {
	const {
		center = 10,       			// target midpoint lightness for dark mode
		lightnessStrength = 0.65,  	// how much to compress toward center (0-1)
		satBaseFactor = 0.55,     	// overall desaturation factor
		applyWarmShift = true
	} = options;

	let { h, s, l } = hexToHSL(hex);

	if (applyWarmShift) h = warmHueShift(h);

	const darkS = hueAwareDesaturation(h, s, satBaseFactor);
	const darkL = compressLightness(l, center, lightnessStrength);

	// Clamp to a safe comfortable band so nothing gets too bright or too dark
	const clampedL = Math.max(22, Math.min(65, darkL));

	return hslToHex(h, darkS, clampedL);
}
