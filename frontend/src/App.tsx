import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./components/main/Product";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
