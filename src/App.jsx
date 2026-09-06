import { useState } from 'react';
import TopBar from './components/TopBar';
import {Template1Section} from "./components/Template1Section.jsx";
import {ChooseTemplateSection} from "./components/ChooseTemplateSection.jsx";
import useGeneratorState from './hooks/useGeneratorState';
import {storage} from "./utils/localStorage.js";

export default function App() {
	const {state, actions} = useGeneratorState(storage.getLocalStorage("staticPage") === true);
	const [templateChosen, setTemplateChosen] =
		useState(storage.getLocalStorage("templateChosen") === true || false);
	const [template, setTemplate] =
		useState(storage.getLocalStorage("template") || 1);

	return (
		<div className="scaffold">
			<TopBar templateChosen={templateChosen} setTemplateChosen={(chosen) => { setTemplateChosen(chosen); storage.setLocalStorage("templateChosen", chosen); }} />

			{(!templateChosen) ? <>
				<div className="card" style={{margin: "1.5rem 0"}}>
					<h2>Choose a type and a template</h2>
					<div className="row">
						<fieldset style={{border: 'none', padding: '0px'}} className="checkbox-field">
							<div style={{margin: '-3px'}}>
								<input type="radio" id="static" name="staticPage" value="true"
									   checked={state.staticPage === true}
									   onChange={(e) => {
										   actions.setProp("staticPage", e.target.checked)
										   storage.setLocalStorage("staticPage", true)
									   }}/>
								<label htmlFor="static">Static Page</label>
							</div>
							<div style={{margin: '-3px'}}>
								<input type="radio" style={{marginTop: '4px'}} id="nonStatic" name="staticPage" value="false"
									   disabled={true}
									   checked={false /*state.staticPage === false*/}
									   onChange={(e) => {
										   /*actions.setProp("staticPage", !e.target.checked)
										   storage.setLocalStorage("staticPage", false)*/
									   }}/>
								<label htmlFor="nonStatic">Form / List / Details (Work in Progress 🚧)</label>
							</div>
						</fieldset>
					</div>
					<ChooseTemplateSection setTemplate={setTemplate} setTemplateChosen={setTemplateChosen} staticPage={state.staticPage} />
				</div>
				</> :
				<Template1Section state={state} actions={actions} />
			}
		</div>
	);
}
