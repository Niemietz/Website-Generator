import {storage} from "../utils/localStorage.js";

export function ChooseTemplateSection({setTemplate, setTemplateChose}) {
	return (
		<main className="templateChooseLayout">
			<section>
				<div className="card">
					<h2>Template 1</h2>
					<div className="row">
						<div className="template-box"
							onClick={e => {
								console.log("choosing template 1");
								setTemplate(1)
								storage.setLocalStorage("templateChose", true)
								setTemplateChose(true)
							}}>
							<div style={{
									backgroundImage: `url("https://raw.githubusercontent.com/Niemietz/Bakery-Sample-React/refs/heads/master/github/demo-1.png")`
								}}
							 	className="template-preview">
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
							<div className="template-preview-blurred">
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
							<div className="template-preview-blurred">
								<h1>COMING SOON</h1>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}