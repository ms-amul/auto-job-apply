// ========================================
// THEME CONFIGURATION
// ========================================
// Uncomment the theme you want to use and comment out the others

// 🌊 OCEAN (Default) - Cool blue/cyan tones
export const theme = {
	accentPrimary: '#056592',
	accentSecondary: '#087c71',
	// Helpers
	getAccentGradient(angle = 90) {
		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
	},
	getAccentFromTo() {
		return { from: this.accentPrimary, to: this.accentSecondary };
	},
};

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

// 🌙 MIDNIGHT - Deep blue/indigo
// export const theme = {
// 	accentPrimary: '#1e40af',
// 	accentSecondary: '#4f46e5',
// 	getAccentGradient(angle = 90) {
// 		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
// 	},
// 	getAccentFromTo() {
// 		return { from: this.accentPrimary, to: this.accentSecondary };
// 	},
// };

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


