export default function FooterBottomCard({card, index, actions}) {
	const cardTitleName = `footer_bottom_title_${index}`
	const cardDescriptionName = `footer_bottom_description_${index}`

	return (
		<div className="entity">
			<div className="row space-between">
				<label className="field grow">
					<span>Title</span>
					<input
						name={cardTitleName}
						className="entity-name"
						type="text"
				   		value={card.title}
				   		onChange={(e) => actions.updateBottomCard(card.id, {title: e.target.value})}
					/>
				</label>
				<label className="field grow">
					<span>Description</span>
					<input
						name={cardDescriptionName}
						className="entity-name"
						type="text"
				   		value={card.description}
				   		onChange={(e) => actions.updateBottomCard(card.id, {description: e.target.value})}
					/>
				</label>
				<button className="btn btn-danger remove-entity"
					onClick={() => actions.removeBottomCard(card.id)}>Remove</button>
			</div>
		</div>
	);
}
