String.prototype.capitalize = function() {
	return (this.length > 1) ? this.charAt(0).toUpperCase() + this.slice(1) : this
}

export default function NavigationCard({navigation, index, actions}) {
	const navigationFieldName = `navigation_${index}`
	const navigationIsCtaName = `navigation_is_cta_${index}`
	const navigationCtaTextName = `navigation_cta_text_${index}`
	const navigationIsAnchorName = `navigation_is_anchor_${index}`

	return (
		<div className="entity">
			<div className="row space-between">
				<label className="field grow">
					<span>Navigation name (e.g. Contact, About)</span>
					<input
						name={navigationFieldName}
						className="entity-name"
						type="text"
				   		value={navigation.name}
				   		onChange={(e) => {
							const _newName = e.target.value
							actions.updateNavigation(
								navigation.id, {
									name: _newName,
									componentName: _newName.capitalize(),
									href: (navigation.isAnchor) ? `#${_newName.capitalize()}` : `/${_newName.capitalize()}`,
								}
							)
						}}
					/>
				</label>
				<label className="checkbox-field">
					<input id={navigationIsCtaName}
						name={navigationIsCtaName}
						type="checkbox"
						checked={navigation.isCta}
						onChange={(e) => {
							const _isCta = e.target.checked
							actions.updateNavigation(
								navigation.id, {
									isCta: _isCta,
									ctaText: ((_isCta) ? navigation.ctaText : null),
								}
							)}
						}/>
					<span>Show as button in header</span>
				</label>
				<label className="field" hidden={!navigation.isCta}>
					<span hidden={!navigation.isCta}>CTA text (e.g. Contact, About)</span>
					<input
					 	hidden={!navigation.isCta}
						name={navigationCtaTextName}
						className="entity-name"
						type="text"
				   		value={navigation.ctaText || ""}
				   		onChange={(e) => actions.updateNavigation(navigation.id, {ctaText: e.target.value})}
					/>
				</label>
				<label className="checkbox-field">
					<input id={navigationIsAnchorName}
						name={navigationIsAnchorName}
						type="checkbox"
						checked={navigation.isAnchor}
						onChange={(e) => {
							const _isAnchor = e.target.checked
							actions.updateNavigation(
								navigation.id, {
									isAnchor: _isAnchor,
									href: (_isAnchor) ? `#${navigation.name.capitalize()}` : `/${navigation.name.capitalize()}`,
								}
							)}
						}/>
					<span>Section on an existing page, not an independent page (Anchor)</span>
				</label>
				<button className="btn btn-danger remove-entity"
					onClick={() => actions.removeNavigation(navigation.id)}>Remove navigation</button>
			</div>
		</div>
	);
}
