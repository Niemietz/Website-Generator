export function ProjectSection({state, actions}) {
	return (
		<div className="card">
			<h2>Project</h2>
			<div className="row">
				<label className="field">
					<span>Project name (used as folder / package name)</span>
					<input id="projectName"
						   type="text"
						   value={state.projectName}
						   onChange={(e) => actions.setProp("projectName", e.target.value)}/>
				</label>
				<label className="field">
					<span>Backend port</span>
					<input id="port"
						   type="number"
						   value={state.port}
						   onChange={(e) => actions.setProp("port", e.target.valueAsNumber)}/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Description (Work in Progress 🚧)</span>
					<input id="description" type="text" placeholder="Optional short description"
						   value={state.description} disabled
						   onChange={(e) => actions.setProp("description", e.target.value)}/>
				</label>
			</div>
			<div className="row">
				<label className="checkbox-field">
					<span className="material-symbols-outlined">login</span>
					<input id="includeLogin"
					       type="checkbox"
					       disabled={true}
					       checked={false}
					       onChange={(e) => undefined }/>
					<span>Include Login Page (Work in Progress 🚧)</span>
				</label>
				<label className="checkbox-field">
					<span className="material-symbols-outlined">notifications</span>
					<input id="includeNotifications"
					       type="checkbox"
					       disabled={true}
					       checked={false}
					       onChange={(e) => undefined }/>
					<span>Include Notifications Badge (Work in Progress 🚧)</span>
				</label>
				{(!state.staticPage) ?
				<label className="checkbox-field">
					<i className="ci ci-json"></i>
					<input id="auth"
						   type="checkbox"
						   disabled={true}
						   checked={false /*state.auth*/}
						   onChange={(e) => undefined /*actions.setProp("auth", e.target.checked)*/}/>
					<span>Include JWT authentication scaffold (User model, register/login, protected routes - Work in Progress 🚧)</span>
				</label> : null}
				{(!state.staticPage) ?
				<label className="checkbox-field">
					<i className="ci ci-mongodb2"></i>
					<input id="includeMongoDB"
						   type="checkbox"
						   disabled={true}
						   checked={true}
						   onChange={(e) => undefined }/>
					<span>Include MongoDB (Work in Progress 🚧 / To be replaced by Firestore)</span>
				</label> : null}
				{(!state.staticPage) ?
				<label className="checkbox-field">
					<i className="ci ci-firebase"></i>
					<input id="includeSqlConnect"
						   type="checkbox"
						   disabled={true}
						   checked={false}
						   onChange={(e) => undefined }/>
					<span>Include Firebase SQL Connect (Work in Progress 🚧)</span>
				</label> : null}
				{(state.staticPage) ?
				<label className="checkbox-field">
					<i>🛒</i>
					<input id="includeMercadoPago"
						   type="checkbox"
						   disabled={true}
						   checked={false}
						   onChange={(e) => undefined }/>
					<span>Include Mercado Pago Payment Service (Work in Progress 🚧)</span>
				</label> : null}
				{(state.staticPage) ?
				<label className="checkbox-field">
					<i>🛒</i>
					<input id="includePagBank"
						   type="checkbox"
						   disabled={true}
						   checked={false}
						   onChange={(e) => undefined }/>
					<span>Include PagBank Payment Service (Work in Progress 🚧)</span>
				</label> : null}
				<label className="checkbox-field">
					<i className="ci ci-gcd"></i>
					<input id="includeGoogleMaps"
						   type="checkbox"
						   disabled={true}
						   checked={false}
						   onChange={(e) => undefined }/>
					<span>Include Google Maps (Work in Progress 🚧)</span>
				</label>
				<label className="checkbox-field">
					<i className="ci ci-azure"></i>
					<input id="includeAzureMaps"
						   type="checkbox"
						   disabled={true}
						   checked={false}
						   onChange={(e) => undefined }/>
					<span>Include Azure Maps (Work in Progress 🚧)</span>
				</label>
			</div>
		</div>
	)
}