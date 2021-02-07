import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setCurrentUser } from "../redux/actions/auth.action";
import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
} from "semantic-ui-react";

import logo from "../images/logo.png";

export const Login = () => {
	const isAuthenticated = useSelector(
		({ auth: { isAuthenticated } }) => isAuthenticated
	);

	const dispatch = useDispatch();

	const handleLogin = () => {
		dispatch(setCurrentUser(true));
		localStorage.setItem("isLogin", "true");
	};

	if (isAuthenticated) return <Redirect to="/" />;

	return (
		<Grid
			textAlign="center"
			style={{ height: "100vh" }}
			verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					<Image src={logo} /> Log-in to your account
				</Header>
				<Form size="large">
					<Segment stacked>
						<Form.Input
							fluid
							placeholder="Type any thing you want to login"
						/>
						<Form.Input
							fluid
							placeholder="Password"
							type="password"
						/>

						<Button
							color="teal"
							fluid
							size="large"
							onClick={handleLogin}>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};
