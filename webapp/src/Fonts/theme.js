import { Global } from "@emotion/react";

const Fonts = () => (
	<Global
		styles={`
        @font-face {
            font-family: 'Inter';
            font-style: bold;
            font-weight: 700;
            font-display: swap;
            src: url('./Fonts/Inter-Bold.ttf') format('ttf);
        }
        @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: normal;
            font-display: swap;
            src: url('./Fonts/Inter-Medium.ttf') format('ttf);
        }
        @font-face {
            font-family: 'Inter';
            font-style: black;
            font-display: swap;
            src: url('./Fonts/Inter-Black.ttf') format('ttf);
        }
        `}
	/>
);

export default Fonts;
