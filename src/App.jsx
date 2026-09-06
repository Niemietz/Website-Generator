import { useState } from 'react';
import TopBar from './components/TopBar';
import {GenerationPage} from "./components/GenerationPage.jsx";
import {ChooseTemplateSection} from "./components/ChooseTemplateSection.jsx";
import useGeneratorState from './hooks/useGeneratorState';
import {storage} from "./utils/localStorage.js";

export default function App() {
	const {state, actions} = useGeneratorState(storage.getLocalStorage("publicWebsite") === true);
	const [templateChosen, setTemplateChosen] =
		useState(storage.getLocalStorage("templateChosen") === true || false);
	const [template, setTemplate] =
		useState(storage.getLocalStorage("template") || 1);

	return (
		<div className="scaffold">
			<TopBar state={state} templateChosen={templateChosen} setTemplateChosen={(chosen) => { setTemplateChosen(chosen); storage.setLocalStorage("templateChosen", chosen); }} />

			{(!templateChosen) ? <>
				<div className="card" style={{margin: "1.5rem 0"}}>
					<h2>Choose a type and a template</h2>
					<div className="row">
						<fieldset style={{border: 'none', padding: '0px'}} className="checkbox-field">
							<div style={{margin: '-3px'}}>
								<input type="radio" id="publicWebsite" name="publicWebsite" value="true"
									   checked={state.publicWebsite === true}
									   onChange={(e) => {
										   actions.setProp("publicWebsite", e.target.checked)
										   storage.setLocalStorage("publicWebsite", true)
									   }}/>
								<label htmlFor="publicWebsite">Public Website</label>
							</div>
							<div style={{margin: '-3px'}}>
								<input type="radio" style={{marginTop: '4px'}} id="management" name="publicWebsite" value="false"
									   disabled={true}
									   checked={false /*state.publicWebsite === false*/}
									   onChange={(e) => {
										   /*actions.setProp("publicWebsite", !e.target.checked)
										   storage.setLocalStorage("publicWebsite", false)*/
									   }}/>
								<label htmlFor="management">Management / Internal System (Work in Progress 🚧)</label>
							</div>
						</fieldset>
					</div>
					<ChooseTemplateSection setTemplate={setTemplate} setTemplateChosen={setTemplateChosen} publicWebsite={state.publicWebsite} />
				</div>
				</> :
				<GenerationPage state={state} actions={actions} />
			}
		</div>
	);
}
