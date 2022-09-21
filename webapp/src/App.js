import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductList from "./components/ProductList/ProductList";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import "./App.css";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/search' element={<ProductList />} />
					<Route path='/productDetail' element={<ProductDetail />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
