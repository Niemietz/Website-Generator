export function MainContentSection({state, actions}) {
	return (
		<div className="card" hidden={!state.staticPage}>
			<h2>Main Content</h2>
			<div className="row">
				<label className="field">
					<span>Text</span>
					<input
						name="mainText"
						className="entity-name"
						type="text"
						value={state.content.main.text}
						onChange={(e) => actions.setMain("text", e.target.value)}
					/>
				</label>
			</div>
		</div>
	)
}