import { Provider } from "react-redux";
import store from "../store/index.js";
import FormOverview from "./FormOverview.js";
import FormDetail from "./FormDetail.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"


export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<FormOverview />} />
                    <Route path="/form/:id" element={<FormDetail />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}