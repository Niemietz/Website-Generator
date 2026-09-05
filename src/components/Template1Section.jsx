import {useEffect, useRef, useState} from "react";
import useGeneratorState from './../hooks/useGeneratorState';
import { API_BASE_URL } from "./../config.js";
import { collectSpec } from "./../utils/spec.js";
import {ProjectSection} from "./ProjectSection.jsx";
import {NavigationSection} from "./NavigationSection.jsx";
import {ColorPaletteSection} from "./ColorPaletteSection.jsx";
import {BannerSection} from "./BannerSection.jsx";
import {MainContentSection} from "./MainContentSection.jsx";
import {FooterSection} from "./FooterSection.jsx";
import {EntitiesSection} from "./EntitiesSection.jsx";

const delay = (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function Template1Section() {
	const scaffold = useRef();
	const {state, actions} = useGeneratorState();
	const [loaded, setLoaded] = useState(false);
	const [busy, setBusy] = useState(false);
	const [view, setView] = useState('generation');
	const [statusMsg, setStatusMsg] = useState({text: '', kind: ''});
	const [previewContent, setPreviewContent] = useState('');

	const fillContent = () => {
		actions.setProp("projectName", "My Bakery")
		actions.setProp("description", "")

		actions.setProp("navigation", [])

		actions.addNavigation("Menu", true)
		actions.addNavigation("About Us", true)
		actions.addNavigation("Contact Us")
		actions.addNavigation("Order Now", false, true, "Order Now")

		actions.setContent("primaryColor", "#FFA07A")
		actions.setContent("secondaryColor", "#FFF3E6")
		actions.setContent("accentColor", "#6B3E2A")
		actions.setContent("mutedColor", "#BFA08A")
		actions.setContent("primaryColorDarkMode", "#803f25")
		actions.setContent("secondaryColorDarkMode", "#9d682e")
		actions.setContent("accentColorDarkMode", "#FFF3E6")
		actions.setContent("mutedColorDarkMode", "#56483e")
		actions.setContent("notFoundMessage", "")

		actions.setHero("image", "https://images.crowdspring.com/blog/wp-content/uploads/2023/05/16174534/bakery-hero.png")
		actions.setHero("title", "Freshly Baked, Just for You!")
		actions.setHero("subtitle", "Warm pastries, artisan breads, and custom cakes baked daily with love.")

		actions.setMain("text", "Welcome to My Bakery 🥖")

		actions.setFooter("bottomCards", [])
		actions.addBottomCard("Captive Baking", "Small-batch precision and control. We craft every loaf with care.")
		actions.addBottomCard("Heavenly Eating", "Delicious pastries that melt in your mouth — created for joy.")

		actions.setFooter("title", "Visit Us Today")
		actions.setFooter("description", "Stop by for a warm loaf or order a custom cake for your event. Our shelves are stocked daily.")
		actions.setFooter("ctaText", "VISIT US TODAY")
		actions.setFooter("rightCornerTitle1", "Address: ")
		actions.setFooter("rightCornerValue1", "123 Sweet Street, Pastry Town")
		actions.setFooter("rightCornerTitle2", "Phone: ")
		actions.setFooter("rightCornerValue2", "+1-234-567-890")
		actions.setFooter("cardTitle1", "Visit")
		actions.setFooter("cardTitle2", "Address: ")
		actions.setFooter("cardValue2", "123 Sweet Street, Pastry Town")
		actions.setFooter("cardTitle3", "Phone: ")
		actions.setFooter("cardValue3", "+1-234-567-890")
	}

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

	useEffect(() => {
		let cancelled = false;

		async function run() {
			await delay(300);

			if (!cancelled) {
				console.log("Finished waiting");
			}
		}

		run().then(() => {
			setLoaded(true)
		});

		return () => {
			cancelled = true;
		};
	}, []);

	return (
		(loaded) ?
			<main className="layout">
				<section>
					<ProjectSection state={state} actions={actions}/>

					<NavigationSection state={state} actions={actions}/>

					<ColorPaletteSection state={state} actions={actions}/>

					<ColorPaletteSection state={state} actions={actions} darkMode={true}/>

					<BannerSection state={state} actions={actions}/>

					<MainContentSection state={state} actions={actions}/>

					<FooterSection state={state} actions={actions}/>

					<EntitiesSection state={state} actions={actions}/>
				</section>

				<aside className="side-column">
					<section>
						<div className="card">
							<h2> Preview</h2>
							<h4>⚠️ Work in Progress 🚧</h4>
						</div>
					</section>
					<section>
						<div className="card">
							<button className="btn btn-primary btn-large" onClick={fillContent} disabled={busy}>
								📝 Fill with plausible content
							</button>
						</div>
					</section>
					<section>
						<div className="card">
							<button className="btn btn-primary btn-large" id="generateBtn" onClick={handleGenerate}
							        disabled={busy}>
								📦 Generate &amp; Download Project
							</button>
							<div id="errors"
							     className="errors">{(statusMsg.kind === 'error') ? statusMsg.text : ""}</div>
							<div id="status"
							     className="status">{(statusMsg.kind !== 'error') ? statusMsg.text : ""}</div>
						</div>
					</section>
				</aside>
			</main> :
			<div style={{padding: "1.5rem 0", textAlign: "center"}}>
				<span className="material-symbols-outlined loading-icon">progress_activity</span>
			</div>
	)
}