export function BannerSection({state, actions}) {
	return (
		<div className="card" hidden={!state.staticPage}>
			<h2>Banner</h2>
			<div className="row space-between">
				<label className="field">
					<span>Banner Text</span>
					<input
						name="bannerText"
						className="entity-name"
						type="text"
						value={state.content.hero.title}
						onChange={(e) => actions.setHero("title", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Banner Subtitle</span>
					<input
						name="bannerSubtitle"
						className="entity-name"
						type="text"
						value={state.content.hero.subtitle}
						onChange={(e) => actions.setHero("subtitle", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Banner Image</span>
					<input
						name="bannerImage"
						className="entity-name"
						type="text"
						value={state.content.hero.image}
						onChange={(e) => actions.setHero("image", e.target.value)}
					/>
				</label>
			</div>
		</div>
	)
}