import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate(); 


	function handlelogout(){
		actions.adminLogout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Let me give</span>
				</Link>
				<div className="ml-auto">
					<Link className="btn btn-primary" to="/campaign">
						Campaign
					</Link>
				</div>
				{store.auth_admin === true ? <button onClick={()=>handlelogout()} className="btn btn-primary">Logout</button>
					: null}
			</div>
		</nav>
	);
};
