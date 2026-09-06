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
			<div id="navigation">
				{state.navigation.map((navigation, index) => (
					<NavigationCard key={navigation.id} index={index} navigation={navigation} actions={actions}/>
				))}
			</div>
		</div>
	)
}