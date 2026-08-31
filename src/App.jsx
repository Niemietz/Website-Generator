import { useRef, useState } from 'react';
import TopBar from './components/TopBar';
import useGeneratorState from './hooks/useGeneratorState';
import EntityCard from "./components/EntityCard.jsx";
import { API_BASE_URL } from "./config.js";
import { collectSpec } from "./utils/spec.js";

export default function App() {
	const scaffold = useRef();
	const {state, actions} = useGeneratorState();
	const [busy, setBusy] = useState(false);
	const [view, setView] = useState('generation');
	const [statusMsg, setStatusMsg] = useState({text: '', kind: ''});
	const [previewContent, setPreviewContent] = useState('');

	const handleGenerate = async () => {
		statusMsg.kind = '';
		statusMsg.text = 'Generating...';

		const spec = collectSpec(state);
		console.warn("spec", spec);

		setBusy(true)

		try {
			const res = await fetch(`${API_BASE_URL}/api/generate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(spec),
			});

			if (!res.ok) {
				console.warn(res);

				const data = await res.json();
				statusMsg.text = (data.errors || ['Unknown error']).join('\n');
				statusMsg.kind = 'error';
				return;
			}

			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${spec.projectName}.zip`;

			scaffold.current.appendChild(a);

			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			statusMsg.text = 'Done! Your project zip has downloaded.';
		} catch (err) {
			statusMsg.text = err.message;
			statusMsg.kind = 'error';
		} finally {
			setBusy(false)
		}
	}

	return (
		<div ref={scaffold}>
			<TopBar />

			<main className="wrap">
				<section className="card">
					<h2>Project</h2>
					<div className="row">
						<label className="field">
							<span>Project name (used as folder / package name)</span>
							<input id="projectName"
							       type="text"
							       value={state.projectName}
							       onChange={(e) => actions.setProp("projectName", e.target.value)}/>
						</label>
						<label className="field">
							<span>Backend port</span>
							<input id="port"
							       type="number"
							       value={state.port}
							       onChange={(e) => actions.setProp("port", e.target.valueAsNumber)}/>
						</label>
					</div>
					<label className="field">
						<span>Description</span>
						<input id="description" type="text" placeholder="Optional short description"
						       value={state.description}
						       onChange={(e) => actions.setProp("description", e.target.value)}/>
					</label>
					<label className="checkbox-field">
						<input id="auth"
						       type="checkbox"
						       checked={state.auth}
						       onChange={(e) => actions.setProp("auth", e.target.checked)}/>
						<span>Include JWT authentication scaffold (User model, register/login, protected routes)</span>
					</label>
					<br/>
					<fieldset style={{border: 'none', padding: '0px'}} className="checkbox-field">
						<div style={{margin: '-3px'}}>
							<input type="radio" id="static" name="staticPage" value="true"
							   checked={state.staticPage}
							   onChange={(e) => actions.setProp("staticPage", e.target.checked)}/>
							<label htmlFor="static">Static Page</label>
						</div>
						<div style={{margin: '-3px'}}>
							<input type="radio" style={{marginTop: '4px'}} id="nonStatic" name="staticPage" value="false"
							   checked={!state.staticPage}
							   onChange={(e) => actions.setProp("staticPage", !e.target.checked)}/>
							<label htmlFor="nonStatic">Form / List / Details</label>
						</div>
					</fieldset>
				</section>

				<section className="card">
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
				</section>

				<section className="card">
					<button className="btn btn-primary btn-large" id="generateBtn" onClick={handleGenerate} disabled={busy} >Generate &amp; Download Project
					</button>
					<div id="errors" className="errors">{(statusMsg.kind === 'error') ? statusMsg.text : ""}</div>
					<div id="status" className="status">{(statusMsg.kind !== 'error') ? statusMsg.text  : ""}</div>
				</section>
			</main>
		</div>
	);
}
