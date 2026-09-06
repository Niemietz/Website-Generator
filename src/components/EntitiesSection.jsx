import EntityCard from "./EntityCard.jsx";

export function EntitiesSection({state, actions}) {
	return (
		<div className="card">
			<div className="row space-between">
				<h2>Entities</h2>
				<button className="btn btn-primary"
						id="addEntityBtn"
						onClick={() => actions.addEntity()}
				>+ Add entity
				</button>
			</div>
			<div id="entities">
				{state.entities.map((entity, index) => (
					<EntityCard key={entity.id} index={index} entity={entity} actions={actions}/>
				))}
			</div>
		</div>
	)
}