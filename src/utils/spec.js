import { z } from 'zod';
import { _superRefineArray, _superRefineName } from "./formValidation.js";

const DEFAULT_APP_NAME = ""
const DEFAULT_BASE_URL = ""
const DEFAULT_ENTITY_NAME = ""
const DEFAULT_GOOGLE_MAPS_KEY = ""
const DEFAULT_AZURE_MAPS_KEY = ""

const NAME_REGEX = /^[0-9A-Za-z_-]{1,15}$/
const FILENAME_REGEX = /^[0-9A-Za-z_.-]{1,50}$/
const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,63}\b(?:[-a-zA-Z0-9()@:%\+.~#?&\/=])$/

export const specSchema = z.object({
	project: z.object({
		appName: z.string().trim().min(1, "App name is required").max(25, "App name must have until 25 characters"),
		baseUrl: z.string().trim().regex(URL_REGEX, 'Invalid base URL'),
		/*googleMapsApiKey: z.string().regex(/^AIza[0-9A-Za-z_-]{35}$/, 'Invalid Google API Key').optional(),
		azureMapsApiKey: z.string().regex(/^[0-9a-fA-F]{32}$/, 'Invalid Azure Key').optional(),*/
	})
	.refine((p) => p.minSdk <= p.targetSdk, {
		message: 'Min SDK version must be equals or lower than Target SDK',
	})
	.refine((p) => p.targetSdk <= p.compileSdk, {
		message: 'Target SDK version must be equals or lower than Compile SDK',
	}),
	entities: z.array(
		z.object({
			name: z.any().optional(),
			path: z.any().optional(),
			fields: z.array(
				z.object({
					path: z.any().optional(),
					name: z.any().optional()
				}).superRefine((data, ctx) => {
					/* Super Refining "name" */
					_superRefineName(data, ctx, "name", "Field name")
				})
			),
		}).superRefine((data, ctx) => {
			/* Super Refining "name" */
			_superRefineName(data, ctx, "name", "Entity name")
		})
	).superRefine((data, ctx) => {
		/* Super Refining "entities" */
		_superRefineArray(data, ctx, "entity")
	})
});

/** Lightweight client-side preview only — normalizeSpec.js on the server is the source of truth. */
export function previewModuleName(rawName) {
	const cleaned = String(rawName || '')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^A-Za-z0-9_-]/g, '');
	return cleaned || 'external-sdk';
}

/** Mirrors the server's usesImages check (entities with an Image field, or SDK methods using
 *  RemoteImage) — used only for the live stats/graph preview. */
export function specUsesImages(state) {
	const entityHasImage = state.entities.some((e) => e.fields.some((f) => f.type === 'Image'));
	const sdkHasImage = state.externalSdks.some((sdk) =>
		sdk.interfaces.some((i) =>
			i.methods.some((m) => m.returnType === 'RemoteImage' || m.parameters.some((p) => p.type === 'RemoteImage'))
		)
	);
	return entityHasImage || sdkHasImage;
}

export function computeStats(state) {
	const screenCount = state.entities.reduce(
		(sum, e) => sum + Object.values(e.screens).filter(Boolean).length,
		state.extraScreens.length + (state.project.includeLogin ? 1 : 0)
	);

	let baseModules = state.project.includeLogin ? 6 : 5; // app + core-common/ui/database/network(+auth)
	if (specUsesImages(state)) baseModules += 1; // core-image
	if (state.project.includeFirebase) baseModules += 1; // core-firebase
	if (state.project.includeFirestore) baseModules += 1; // core-firestore
	if (state.project.includeLottie) baseModules += 1; // core-lottie
	if (state.project.includeGoogleMaps && state.project.includeAzureMaps) baseModules += 3; // core-maps, google-maps, azure-maps
	if (state.project.includeGoogleMaps && !state.project.includeAzureMaps) baseModules += 2; // core-maps, google-maps, azure-maps
	if (!state.project.includeGoogleMaps && state.project.includeAzureMaps) baseModules += 2; // core-maps, google-maps, azure-maps

	return {
		entities: state.entities.length,
		screens: screenCount,
		modules: baseModules + state.entities.length + state.externalSdks.length * 2,
	};
}

/** Builds the exact JSON payload shape the backend API expects */
export function collectSpec (state) {
	return {
		projectName: state.projectName.trim() || "",
		description: state.description.trim() || "",
		port: state.port || 5000,
		auth: state.auth,
		staticPage: state.staticPage,
		/*includeLogin: state.project.includeLogin,
		includeFirebase: state.project.includeFirebase,
		includeGoogleMaps: state.project.includeGoogleMaps,
		includeAzureMaps: state.project.includeAzureMaps,
		includeSqlConnectVariant: state.project.includeSqlConnectVariant,
		includeFirestore: state.project.includeFirestore,
		sync: {
			maxRetries: Number(state.sync.maxRetries) || 0,
			periodicSyncEnabled: state.sync.periodicSyncEnabled,
			periodicSyncIntervalMinutes: Number(state.sync.periodicSyncIntervalMinutes) || 15,
		},
		imageCache: {
			syncEnabled: state.imageCache.syncEnabled,
			syncIntervalMinutes: Number(state.imageCache.syncIntervalMinutes) || 60,
		},
		imageBackend: state.imageBackend,*/
		entities: state.entities
			.map((e) => ({
				name: e.name.trim() || "",
				fields: e.fields
					.map((f) => ({name: f.name.trim(), type: f.type, ref: undefined, required: f.nullable, unique: f.unique}))
					.filter((f) => f.name.length > 0),
				//screens: {...e.screens},
			})),
		/*projectName: document.getElementById('projectName').value.trim() || 'my-app',
		description: document.getElementById('description').value.trim(),
		port: Number(document.getElementById('port').value) || 5000,
		auth: document.getElementById('auth').checked,
		entities,*/
	};
}
