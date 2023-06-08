import Header from "./components/header/Header";
import Main from "./components/main/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./components/main/Product";
import Account from "./components/main/Account";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
      </div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
