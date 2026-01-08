// ========================================
// THEME CONFIGURATION
// ========================================
// Uncomment the theme you want to use and comment out the others

// 🌊 OCEAN (Default) - Cool blue/cyan tones
// export const theme = {
// 	accentPrimary: '#056592',
// 	accentSecondary: '#087c71',
// 	// Helpers
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };

// 🌅 SUNSET - Warm orange/red vibes
// export const theme = {
// 	accentPrimary: '#ea580c',
// 	accentSecondary: '#dc2626',
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };

// 🌲 FOREST - Fresh green tones
// export const theme = {
// 	accentPrimary: '#059669',
// 	accentSecondary: '#16a34a',
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };

// 💜 PURPLE - Vibrant purple/magenta
// export const theme = {
// 	accentPrimary: '#7c3aed',
// 	accentSecondary: '#c026d3',
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };

// 🌙 MIDNIGHT - Deep blue/indigo (ACTIVE)
// 🔵 GLOBAL THEME - Uses CSS Variables (Blue/Cyan)
export const theme = {
	accentPrimary: 'var(--primary)',
	accentSecondary: 'var(--secondary)', // Using cyan-900 as secondary
	accentTertiary: 'var(--accent)',     // Using cyan-600 as accent

	backgroundStart: 'var(--background-start)',
	backgroundEnd: 'var(--background-end)',

	getAccentGradient(angle = 90) {
		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentTertiary})`; // Primary to Accent(Cyan) for brighter gradients
	},
	getAccentFromTo() {
		return { from: this.accentPrimary, to: this.accentTertiary };
	},
	// Helper for dark backgrounds (Primary to Secondary)
	getDarkGradient(angle = 90) {
		return `linear-gradient(${angle}deg, ${this.accentSecondary}, ${this.accentPrimary})`;
	}
};

// 🌹 ROSE - Romantic red/pink
// export const theme = {
// 	accentPrimary: '#be123c',
// 	accentSecondary: '#db2777',
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };
