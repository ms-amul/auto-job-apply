export const theme = {
	accentPrimary: '#056592', // sky-500
	accentSecondary: '#087c71', // cyan-400
	// Helpers
	getAccentGradient(angle = 90) {
		return `linear-gradient(${angle}deg, ${this.accentPrimary}, ${this.accentSecondary})`;
	},
	getAccentFromTo() {
		return { from: this.accentPrimary, to: this.accentSecondary };
	},
};


