import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./view/Header/Header";
import Footer from "./view/Footer/Footer";
import MainPage from "./view/MainPage/MainPage";
import RegisterPage from "./view/RegisterPage/RegisterPage";
import QnAPage from "./view/QnAPage/QnAPage";
import LoginPage from "./view/LoginPage/LoginPage";
import UserPage from "./view/UserPage/UserPage";
import WritePage from "./view/WritePage/WritePage";
import ProfileEditPage from "./view/ProfileEditPage/ProfileEditPage";
import TechnicalNews from "./view/TechnicalNews/TechnicalNews";
import styles from "../assets/style/Layout.module.scss";
import "../assets/style/reset.css";
import "../assets/style/global.scss";

const App = () => {
	return (
		<div className="App">
			<Router>
				<div>
					<Header />
					<div className={styles.layout}>
						<Switch>
							<Route
								path="/RegisterPage"
								component={RegisterPage}
							/>
							<Route path="/LoginPage" component={LoginPage} />
							<Route path="/UserPage" component={UserPage} />
							<Route path="/WritePage" component={WritePage} />
							<Route path="/QnAPage" component={QnAPage} />
							<Route path="/TechnicalNews" component={TechnicalNews} />
							<Route
								path="/ProfileEditPage"
								component={ProfileEditPage}
							/>
							<Route path="/" component={MainPage} />
						</Switch>
					</div>
					<Footer />
				</div>
			</Router>
		</div>
	);
};

export default App;