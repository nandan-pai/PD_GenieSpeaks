import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
	colors: {
		white: {
			100: "#f7fafc",
			900: "#ffffff",
		},
		gray: {
			100: "#252525",
			200: "#171717",
			500: "#373737",
		},
	},
	fonts: {
		heading: `'Inter', sans-serif`,
		body: `'Inter', sans-serif`,
	},
	fontWeights: {
		thin: 200,
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	},
	components: {
		Progress: {
			baseStyle: {
				track: {
					bg: "#f7fafc",
				},
			},
		},
	},
});

export default customTheme;
