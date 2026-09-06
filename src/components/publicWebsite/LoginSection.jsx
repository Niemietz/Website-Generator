import UserCard from "./UserCard.jsx";

export function LoginSection({state, actions}) {
	return (
		<div className="card">
			<div className="row space-between">
				<h2>Login (Work in Progress 🚧)</h2>
			</div>
			<div className="row">
				<label className="checkbox-field">
					<span className="material-symbols-outlined">login</span>
					<input id="includeLogin"
					       type="checkbox"
					       disabled={true}
					       /*disabled={state.includePaymentService === true ||
							   state.includeNotifications === true ||
							   state.includeGoogleMaps === true ||
							   state.includeAzureMaps === true}*/
					       checked={state.includeLogin}
					       onChange={(e) => actions.setProp("includeLogin", e.target.checked) }/>
					<span>Include Login Feature{state.includeLogin === true && " (Ok, now choose a database above ☝️)"}</span>
				</label>
			</div>
			{state.includeLogin === true &&
				<>
					<hr/>
					<div className="row">
						<label className="checkbox-field">
							<span className="material-symbols-outlined">admin_panel_settings</span>
							<input id="includeAdmin"
								type="checkbox"
								disabled={state.includePaymentService === true ||
									state.includeNotifications === true ||
									state.includeGoogleMaps === true ||
									state.includeAzureMaps === true}
								checked={state.includeAdmin === true ||
									state.includePaymentService === true ||
									state.includeNotifications === true ||
									state.includeGoogleMaps === true ||
									state.includeAzureMaps === true}
								onChange={(e) =>
									actions.setProp("includeAdmin", e.target.checked)
								}/>
							<span>Include Administrator<br/>• It also generates the management project<br/>• No need to add user, a default one will be created<br/>(User: admin | Password: @dm1n_{new Date().getFullYear()})</span>
						</label>
					</div>
					<div className="row space-between">
						<h4>Users (Non-administrators)</h4>
						<button className="btn btn-primary"
						        id="addUserBtn"
						        onClick={() => actions.addUser()}
						>+ Add normal user
						</button>
					</div>
					<div id="users">
						{state.login.users.map((user, index) => (
							<UserCard key={user.id} index={index} user={user} actions={actions}/>
						))}
					</div>
				</>
			}
		</div>
	)
}