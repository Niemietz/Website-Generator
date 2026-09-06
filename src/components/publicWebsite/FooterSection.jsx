import EntityCard from "../EntityCard.jsx";
import FooterBottomCard from "./FooterBottomCard.jsx";

export function FooterSection({state, actions}) {
	return (
		<div className="card">
			<div className="row space-between">
				<h2>Footer</h2>
			</div>
			<div className="row">
				<label className="field">
					<span>Title</span>
					<input
						name="footerTitle"
						className="entity-name"
						type="text"
						value={state.content.footer.title}
						onChange={(e) => actions.setFooter("title", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Description</span>
					<input
						name="footerDescription"
						className="entity-name"
						type="text"
						value={state.content.footer.description}
						onChange={(e) => actions.setFooter("description", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>CTA Text</span>
					<input
						name="footerCta"
						className="entity-name"
						type="text"
						value={state.content.footer.ctaText}
						onChange={(e) => actions.setFooter("ctaText", e.target.value)}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Card Title</span>
					<input
						name="footerCard1Title"
						className="entity-name"
						type="text"
						value={state.content.footer.cardTitle1}
						onChange={(e) => actions.setFooter("cardTitle1", e.target.value)}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Card Subtitle 1</span>
					<input
						name="footerCard2Title"
						className="entity-name"
						type="text"
						value={state.content.footer.cardTitle2}
						onChange={(e) => actions.setFooter("cardTitle2", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Card Value 1</span>
					<input
						name="footerCard2Value"
						className="entity-name"
						type="text"
						value={state.content.footer.cardValue2}
						onChange={(e) => actions.setFooter("cardValue2", e.target.value)}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Card Subtitle 2</span>
					<input
						name="footerCard3Title"
						className="entity-name"
						type="text"
						value={state.content.footer.cardTitle3}
						onChange={(e) => actions.setFooter("cardTitle3", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Card Value 2</span>
					<input
						name="footerCard3Value"
						className="entity-name"
						type="text"
						value={state.content.footer.cardValue3}
						onChange={(e) => actions.setFooter("cardValue3", e.target.value)}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Right Corner Subtitle 1</span>
					<input
						name="footerRightCorner1Title"
						className="entity-name"
						type="text"
						value={state.content.footer.rightCornerTitle1}
						onChange={(e) => actions.setFooter("rightCornerTitle1", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Right Corner Value 1</span>
					<input
						name="footerRightCorner1Value"
						className="entity-name"
						type="text"
						value={state.content.footer.rightCornerValue1}
						onChange={(e) => actions.setFooter("rightCornerValue1", e.target.value)}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field">
					<span>Right Corner Subtitle 2</span>
					<input
						name="footerRightCorner2Title"
						className="entity-name"
						type="text"
						value={state.content.footer.rightCornerTitle2}
						onChange={(e) => actions.setFooter("rightCornerTitle2", e.target.value)}
					/>
				</label>
				<label className="field">
					<span>Right Corner Value 2</span>
					<input
						name="footerRightCorner2Value"
						className="entity-name"
						type="text"
						value={state.content.footer.rightCornerValue2}
						onChange={(e) => actions.setFooter("rightCornerValue2", e.target.value)}
					/>
				</label>
			</div>
			<div className="row space-between">
				<h4>Bottom Cards</h4>
				<button className="btn btn-primary"
						id="addBottomCardBtn"
						onClick={() => actions.addBottomCard()}
				>+ Add card
				</button>
			</div>
			<div id="bottomCards">
				{state.content.footer.bottomCards.map((card, index) => (
					<FooterBottomCard key={card.id} index={index} card={card} actions={actions}/>
				))}
			</div>
		</div>
	)
}