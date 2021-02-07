import React, { Component, useMemo, useState } from "react";
import "../styles/layout.css";
import profile from "../images/profile-img.jpg";
import setting from "../images/setting-icon.svg";
import home from "../images/icons8-home.svg";
import noti from "../images/noti.png";
import logout from "../images/logout.png";

import menu from "../images/menu.svg";

import { isMobile, isIOS } from "react-device-detect";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/actions/auth.action";
import { Link } from "react-router-dom";

const menuItem = [
	{
		id: 1,
		title: "Home",
		icon: home,
		isSideBar: true,
		link: "/",
	},
	{
		id: 2,
		title: "Setting",
		icon: setting,
		isSideBar: true,
		link: "/setting",
	},
	{
		id: 3,
		title: "Notification",
		icon: noti,
		isSideBar: false,
	},
];

export const Layout = ({ children }) => {
	const [showHeader, setShowHeader] = useState(true);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(setCurrentUser(false));
		localStorage.clear();
		window.location.href = "/login";
	};

	const renderLeftSideBar = useMemo(
		() => (
			<nav className="nav-menu">
				<ul>
					{menuItem.map(
						(e, i) =>
							e.isSideBar && (
								<li
									className={`${i === 0} ? "active" : ""`}
									key={e.id}>
									<Link to={e.link}>
										<img src={e.icon} alt={e.title} />
										<span>{e.title}</span>
									</Link>
								</li>
							)
					)}
				</ul>
			</nav>
		),
		[menuItem]
	);

	const renderMainNav = useMemo(
		() => (
			<>
				{menuItem.map((e, i) =>
					isMobile ? (
						<li key={e.id}>
							<a>
								<img src={e.icon} alt={e.title} />
							</a>
						</li>
					) : (
						!e.isSideBar && (
							<li key={e.id}>
								<a>
									<img src={e.icon} alt={e.title} />
								</a>
							</li>
						)
					)
				)}
			</>
		),
		[isMobile]
	);

	return (
		<>
			<div className="layout-container">
				<header id="header" className={`${!showHeader ? "close" : ""}`}>
					<div className="d-flex flex-column">
						<div className="profile">
							<img
								src={profile}
								alt="profile img"
								className="img-fluid rounded-circle"
							/>
							<h1 className="text-light">
								<a href="index.html">Alex Smith</a>
							</h1>
						</div>
						{renderLeftSideBar}
					</div>
				</header>

				<div id="main" className={`${!showHeader ? "close" : ""}`}>
					<div id="main-nav" className={`${isIOS ? "ios" : "'"}`}>
						{!isMobile && (
							<button
								className="toggle_menu"
								onClick={() => setShowHeader(!showHeader)}>
								<img src={menu} alt="menu icon" />
							</button>
						)}
						<ul className={`${isMobile ? "android-nav" : ""}`}>
							{renderMainNav}
							<li key="logout" onClick={() => handleLogout()}>
								<a>
									<img src={logout} alt="logout" />
								</a>
							</li>
						</ul>
					</div>
					<div id="content">{children}</div>
				</div>
			</div>

			<footer
				id="footer"
				className={`${!showHeader ? "close" : ""} ${
					isIOS ? "ios" : "'"
				}`}>
				<div className="container">
					<div className="copyright">
						&copy; Copyright{" "}
						<strong>
							<span>Dashboard</span>
						</strong>
					</div>
					<div className="credits">
						Designed by
						<a href="https://github.com/hoangdai9895/hoangdai9895/">
							Dailch
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};
