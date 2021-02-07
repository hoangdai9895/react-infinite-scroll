import React from "react";

import "../styles/app.css";
import GalleryModal from "./GalerryModal";
import { Provider } from "react-redux";
import { Layout } from "../common/Layout";
import store from "../redux/store";
import { PrivateRoute } from "../common/PrivateRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./Login";
import { setCurrentUser } from "../redux/actions/auth.action";

if (localStorage.getItem("isLogin")) {
	store.dispatch(setCurrentUser(true));
}

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Switch>
						<Layout>
							<PrivateRoute
								exact
								path="/"
								component={GalleryModal}
							/>
						</Layout>
					</Switch>
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
