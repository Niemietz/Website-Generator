export default function TopBar({state, templateChosen, setTemplateChosen}) {
	return (
		<header className="topbar">
			<div className="row">
				{(templateChosen === true) ? <div style={{alignSelf: 'center'}}>
					<span className="material-symbols-outlined" style={{cursor: "pointer"}} onClick={(e) => setTemplateChosen(false)}>arrow_back</span>
				</div> : null}
				<div>
					<h1>Website & Web App Generator - {state.publicWebsite === true ? "Public Website" : "Management / Internal System"}</h1>
					<p>Describe your entities and screens. Get a ready-to-run Node.js + Express + React project.</p>
				</div>
			</div>
		</header>
	);
}
