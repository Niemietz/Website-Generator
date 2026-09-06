import {storage} from "../utils/localStorage.js";

export function ChooseTemplateSection({setTemplate, setTemplateChosen, staticPage}) {
	const template1Url =
		(staticPage) ?
			"https://raw.githubusercontent.com/Niemietz/Bakery-Sample-React/refs/heads/master/github/demo-1.png" :
			"https://raw.githubusercontent.com/Niemietz/Bakery-Sample-Admin-Spring-Boot-Java-and-Vue/refs/heads/master/github/demo-1.png"

	return (
		<main className="templateChooseLayout">
			<section>
				<div className="card">
					<h2>Template 1</h2>
					<div className="row">
						<div className="template-box"
							onClick={e => {
								if (!staticPage) {
									return;
								}
								storage.setLocalStorage("template", 1)
								setTemplate(1)
								storage.setLocalStorage("templateChosen", true)
								setTemplateChosen(true)
							}}>
							<div style={{
									backgroundImage: `url("${template1Url}")`
								}}
							 	className={(staticPage) ? "template-preview" : "template-preview-form-list-details-blurred"}>
								{(staticPage) ? <></> : <h1>COMING SOON</h1>}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="card">
					<h2>Template 2</h2>
					<div className="row">
						<div className="template-box">
							<div className={(staticPage) ? "template-preview-blurred" : "template-preview-form-list-details-blurred"}>
								<h1>COMING SOON</h1>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section>
				<div className="card">
					<h2>Template 3</h2>
					<div className="row">
						<div className="template-box">
							<div className={(staticPage) ? "template-preview-blurred" : "template-preview-form-list-details-blurred"}>
								<h1>COMING SOON</h1>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}