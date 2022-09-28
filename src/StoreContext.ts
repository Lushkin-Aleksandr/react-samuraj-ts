import React from "react";
import store, {StoreType} from "./redux/redux-store";

const StoreContext = React.createContext<StoreType>(store)

export default StoreContext;