import { useRef, useState } from 'react';
import TopBar from './components/TopBar';
import {Template1Section} from "./components/Template1Section.jsx";
import {ChooseTemplateSection} from "./components/ChooseTemplateSection.jsx";
import {storage} from "./utils/localStorage.js";

export default function App() {
	const [templateChose, setTemplateChose] =
		useState(storage.getLocalStorage("templateChose") || false);
	const [template, setTemplate] = useState(1);

	return (
		<div className="scaffold">
			<TopBar templateChose={templateChose} setTemplateChose={setTemplateChose} />
			{(!templateChose) ?
				<ChooseTemplateSection setTemplate={setTemplate} setTemplateChose={setTemplateChose}/> :
				<Template1Section />
			}
		</div>
	);
}
