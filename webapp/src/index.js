import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import customTheme from "./extendTheme";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<ChakraProvider theme={customTheme}>
			<App />
		</ChakraProvider>
	</>
);
