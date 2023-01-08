import './App.css';

import { Routes, Route } from "react-router-dom";
import {useEffect} from "react";
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";

function App() {

  const { tg, onToggleButton } = useTelegram()

  useEffect(() => {
    tg.ready();
  },[tg])

  return (
      <div className="App">
        <Header/>
        <Routes>
            <Route
                index
                element={<ProductList/>}
            />
            <Route
                path={'form'}
                element={<Form/>}
            />
        </Routes>
      </div>
  )
}

export default App;
