import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStandaloneToast } from "@chakra-ui/toast";
import { ChakraProvider } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<ChakraProvider>
			<App />
		</ChakraProvider>
		<ToastContainer />
	</>
);

toast({ title: "Chakra UI" });
