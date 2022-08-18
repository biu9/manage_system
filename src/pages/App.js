import { Provider } from "react-redux";
import store from "../store/index.js";
import FormOverview from "./FormOverview.js";

export default function App() {
    return (
        <Provider store={store}>
            <FormOverview />
        </Provider>
    )
}