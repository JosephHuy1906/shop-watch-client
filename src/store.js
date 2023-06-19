import { createStore } from "zustand";
import rootReducer from "./reducers";

const store = createStore(rootReducer)
 
export default store;