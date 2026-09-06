import {useEffect, useRef, useState} from "react";
import { API_BASE_URL } from "./../config.js";
import { collectSpec } from "./../utils/spec.js";
import {ProjectSection} from "./publicWebsite/ProjectSection.jsx";
import {NavigationSection} from "./publicWebsite/NavigationSection.jsx";
import {ColorPaletteSection} from "./publicWebsite/ColorPaletteSection.jsx";
import {BannerSection} from "./publicWebsite/BannerSection.jsx";
import {MainContentSection} from "./publicWebsite/MainContentSection.jsx";
import {FooterSection} from "./publicWebsite/FooterSection.jsx";
import {EntitiesSection} from "./EntitiesSection.jsx";
import {PaymentServiceSection} from "./publicWebsite/PaymentServiceSection.jsx";
import {LoginSection} from "./publicWebsite/LoginSection.jsx";
import {FeaturesSection} from "./publicWebsite/FeaturesSection.jsx";

const delay = (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export function GenerationPage({state, actions}) {
	const mainRef = useRef();
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
		if (state.publicWebsite === false) {
			setStatusMsg({...statusMsg, text: 'Not available yet! This is a WIP 🚧', kind: "error" });
			return
		}

		setStatusMsg({...statusMsg, text: 'Generating...', kind: '' });

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
				setStatusMsg({...statusMsg, text: (data.errors || ['Unknown error']).join('\n'), kind: 'error' });
				return;
			}

			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${spec.projectName}.zip`;

			mainRef.current.appendChild(a);

			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			setStatusMsg({...statusMsg, text: "Done! Your project zip has downloaded.", kind: '' });
		} catch (err) {
			setStatusMsg({...statusMsg, text: err.message, kind: 'error' });
		} finally {
			setBusy(false)
		}
	}

	useEffect(() => {
		let cancelled = false;

		async function run() {
			await delay(300);
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
			<main className="layout" ref={mainRef}>
				<section>
					<ProjectSection state={state} actions={actions}/>

					<FeaturesSection state={state} actions={actions}/>

					{state.publicWebsite === true && (
						<>
						<PaymentServiceSection state={state} actions={actions}/>

						<LoginSection state={state} actions={actions}/>
						</>
					)}

					<NavigationSection state={state} actions={actions}/>

					{(state.publicWebsite === false || state.includeLogin === true) && (
						<EntitiesSection state={state} actions={actions}/>
					)}

					<ColorPaletteSection state={state} actions={actions}/>

					<ColorPaletteSection state={state} actions={actions} darkMode={true}/>

					{state.publicWebsite === true && (
						<>
							<BannerSection state={state} actions={actions}/>

							<MainContentSection state={state} actions={actions}/>

							<FooterSection state={state} actions={actions}/>
						</>
					)}
				</section>

				<aside className="side-column">
					{state.publicWebsite === true && (
					<>
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
					</>
					)}
					<section>
						<div className="card">
							<button className="btn btn-primary btn-large" id="generateBtn" onClick={handleGenerate}
							        disabled={busy}>
								📦 Generate &amp; Download Project
							</button>
							<div className={(statusMsg.kind === "error") ? "errors" : "status"}>{statusMsg.text}</div>
						</div>
					</section>
				</aside>
			</main> :
			<div style={{padding: "1.5rem 0", textAlign: "center"}}>
				<span className="material-symbols-outlined loading-icon">progress_activity</span>
			</div>
	)
}