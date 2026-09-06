import NavigationCard from "./NavigationCard.jsx";

export function NavigationSection({state, actions}) {
	return (
		<div className="card" hidden={!state.publicWebsite}>
			<div className="row space-between">
				<h2>Navigation</h2>
				<button className="btn btn-primary"
						id="addNavigationBtn"
						onClick={() => actions.addNavigation()}
				>+ Add navigation
				</button>
			</div>
			<div className="row">
				<label className="checkbox-field">
					<span className="material-symbols-outlined">email</span>
					<input id="includeContactPage"
					       type="checkbox"
					       disabled={true}
					       checked={state.includeContactPage}
					       onChange={(e) => actions.setProp("includeContactPage", e.target.checked) }/>
					<span>Include Contact Page (Work in Progress 🚧)</span>
				</label>
			</div>
			<div id="navigation">
				{state.navigation.map((navigation, index) => (
					<>
					{ index === 0 ? <br /> : null }
					<NavigationCard key={navigation.id} index={index} navigation={navigation} actions={actions}/>
					</>
				))}
			</div>
		</div>
	)
}