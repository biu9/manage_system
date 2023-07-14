import { Provider } from "react-redux";
import store from "../store/index.js";
import FormOverview from "./FormOverview.js";
import FormDetail from "./FormDetail.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PRD_URL } from "../conf/index.js";

export default function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path={PRD_URL+"static/hca-admin/"} element={<FormOverview />} />
                    <Route path={PRD_URL+"static/hca-admin/form/:id"} element={<FormDetail />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    )
}