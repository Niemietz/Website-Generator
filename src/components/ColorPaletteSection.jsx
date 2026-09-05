import { toDarkMode } from "./../utils/colors";
import { useEffect, useState } from "react";

export function ColorPaletteSection({state, actions, darkMode = false}) {
	useEffect(() => {
		if (darkMode) {
			const lightPalette = {
				primary:   state.content.primaryColor,
				secondary: state.content.secondaryColor,
				muted:     state.content.mutedColor
			};

			const darkPalette = Object.fromEntries(
				Object.assign(
					Object.entries(lightPalette).map(([key, hex]) => [key, toDarkMode(hex)]),
					{ accent: state.content.secondaryColor }
				)
			);

			actions.setContent("primaryColorDarkMode", darkPalette.primary)
			actions.setContent("secondaryColorDarkMode", darkPalette.secondary)
			actions.setContent("accentColorDarkMode", darkPalette.accent)
			actions.setContent("mutedColorDarkMode", darkPalette.muted)
		}
	}, []);

	return (
		<div className="card" hidden={!state.staticPage}>
			<h2>Color Palette{(darkMode) ? " (for Dark Mode 🌒)" : " (for Light Mode 💡)"}</h2>
			<div className="row">
				<label className="field grow">
					<span>Primary Color</span>
					<input
						name={(darkMode) ? 'primaryColorDarkMode' : 'primaryColor'}
						className="entity-name"
						style={{padding: "unset"}}
						type="color"
						value={state.content[(darkMode) ? 'primaryColorDarkMode' : 'primaryColor']}
						onChange={(e) => {
							actions.setContent((darkMode) ? 'primaryColorDarkMode' : 'primaryColor', e.target.value)
							if (darkMode === false) {
								actions.setContent('primaryColorDarkMode', toDarkMode(e.target.value))
							}
						}}
					/>
				</label>
				<label className="field grow">
					<span>Secondary Color</span>
					<input
						name={(darkMode) ? 'secondaryColorDarkMode' : 'secondaryColor'}
						className="entity-name"
						style={{padding: "unset"}}
						type="color"
						value={state.content[(darkMode) ? 'secondaryColorDarkMode' : 'secondaryColor']}
						onChange={(e) => {
							actions.setContent((darkMode) ? 'secondaryColorDarkMode' : 'secondaryColor', e.target.value)
							if (darkMode === false) {
								actions.setContent('secondaryColorDarkMode', toDarkMode(e.target.value))
								actions.setContent('accentColorDarkMode', e.target.value)
							}
						}}
					/>
				</label>
				<label className="field grow">
					<span>Accent Color</span>
					<input
						name={(darkMode) ? 'accentColorDarkMode' : 'accentColor'}
						className="entity-name"
						style={{padding: "unset"}}
						type="color"
						value={state.content[(darkMode) ? 'accentColorDarkMode' : 'accentColor']}
						onChange={(e) => {
							actions.setContent((darkMode) ? 'accentColorDarkMode' : 'accentColor', e.target.value)
							if (darkMode === false) {
								actions.setContent('accentColorDarkMode', state.content.secondaryColor)
							}
						}}
					/>
				</label>
			</div>
			<div className="row">
				<label className="field grow">
					<span>Muted Color</span>
					<input
						name={(darkMode) ? 'mutedColorDarkMode' : 'mutedColor'}
						className="entity-name"
						style={{padding: "unset"}}
						type="color"
						value={state.content[(darkMode) ? 'mutedColorDarkMode' : 'mutedColor']}
						onChange={(e) => {
							actions.setContent((darkMode) ? 'mutedColorDarkMode' : 'mutedColor', e.target.value)
							if (darkMode === false) {
								actions.setContent('mutedColorDarkMode', toDarkMode(e.target.value))
							}
						}}
					/>
				</label>
			</div>
		</div>
	)
}