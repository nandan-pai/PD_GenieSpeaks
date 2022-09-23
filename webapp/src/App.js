import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { useState } from "react";
import "./App.css";

function App() {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={
							<LandingPage
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
							/>
						}
					/>
					<Route
						path='/search'
						element={
							<ProductList
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
							/>
						}
					/>
					<Route path='/product/:id' element={<ProductDetail />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
