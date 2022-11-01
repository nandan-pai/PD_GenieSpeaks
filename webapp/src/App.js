import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductList from "./components/ProductList/ProductList";
import { useState } from "react";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ProductDetail from "./components/ProductDetail/ProductDetail";

const App = () => {
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
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
					<Route
						path='/product/:id'
						element={
							<ProductDetail
								searchQuery={searchQuery}
								setSearchQuery={setSearchQuery}
							/>
						}
					/>
				</Routes>
			</BrowserRouter>
			{/* <NavSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> */}
		</div>
	);
};

export default App;
