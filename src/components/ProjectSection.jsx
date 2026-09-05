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
			<label className="field">
				<span>Description</span>
				<input id="description" type="text" placeholder="Optional short description"
					   value={state.description}
					   onChange={(e) => actions.setProp("description", e.target.value)}/>
			</label>
			<label className="checkbox-field">
				<input id="auth"
					   type="checkbox"
					   checked={state.auth}
					   onChange={(e) => actions.setProp("auth", e.target.checked)}/>
				<span>Include JWT authentication scaffold (User model, register/login, protected routes)</span>
			</label>
			<br/>
			<fieldset style={{border: 'none', padding: '0px'}} disabled={true} className="checkbox-field">
				<div style={{margin: '-3px'}}>
					<input type="radio" id="static" name="staticPage" value="true"
						   checked={state.staticPage}
						   onChange={(e) => actions.setProp("staticPage", e.target.checked)}/>
					<label htmlFor="static">Static Page</label>
				</div>
				<div style={{margin: '-3px'}}>
					<input type="radio" style={{marginTop: '4px'}} id="nonStatic" name="staticPage" value="false"
						   checked={!state.staticPage}
						   onChange={(e) => actions.setProp("staticPage", !e.target.checked)}/>
					<label htmlFor="nonStatic">Form / List / Details (⚠️ Work in Progress 🚧)</label>
				</div>
			</fieldset>
		</div>
	)
}