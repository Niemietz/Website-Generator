import {storage} from "../../utils/localStorage.js";

export function FeaturesSection({state, actions}) {
	return (
		<div className="card">
			<h2>Features (Work in Progress 🚧)</h2>
			<div className="row">
				{ (state.includeLogin === true || state.publicWebsite === false) &&
				<fieldset style={{border: 'none', padding: '0px'}} className="checkbox-field">
					<div style={{margin: '-3px'}}>
						<i className="ci ci-firebase"></i>
						<input type="radio" id="includeSqlConnect" name="database" value="sqlConnect"
							checked={state.includeSqlConnect === true}
							onChange={(e) => {
								actions.setProp("includeSqlConnect", true)
								actions.setProp("includeMongoDB", false)
							}}/>
						<label htmlFor="includeSqlConnect">Use Firebase SQL Connect</label>
					</div>
					<div style={{margin: '-3px'}}>
						<i className="ci ci-mongodb2"></i>
						<input type="radio" style={{marginTop: '4px'}} id="includeMongoDB" name="database" value="mongoDB"
							checked={state.includeMongoDB === true}
							onChange={(e) => {
								actions.setProp("includeMongoDB", true)
								actions.setProp("includeSqlConnect", false)
							}}/>
						<label htmlFor="includeMongoDB">Use MongoDB (you will have to set your own configuration)</label>
					</div>
				</fieldset>
				}
				{ state.publicWebsite === true &&
				<label className="checkbox-field">
					<i className="ci ci-whatsapp"></i>
					<input id="includeWhatsAppChat"
						   type="checkbox"
						   disabled={true}
						   checked={state.includeWhatsAppChat}
						   onChange={(e) => {
							   actions.setProp("includeWhatsAppChat", e.target.checked)
							   if (e.target.checked === true && state.includeLogin === false) {
								   actions.setProp("includeLogin", true)
							   }
						   }}/>
					<span>Include WhatsApp Chat</span>
				</label>
				}
				<label className="checkbox-field">
					<span className="material-symbols-outlined">notifications</span>
					<input id="includeNotifications"
					       type="checkbox"
					       disabled={true}
					       checked={state.includeNotifications}
					       onChange={(e) => {
							   actions.setProp("includeNotifications", e.target.checked)
							   if (e.target.checked === true && state.includeLogin === false) {
								   actions.setProp("includeLogin", true)
							   }
						   }}/>
					<span>Include Notifications Badge</span>
				</label>
				<label className="checkbox-field">
					<i className="ci ci-gcd"></i>
					<input id="includeGoogleMaps"
						   type="checkbox"
						   disabled={true}
						   checked={state.includeGoogleMaps}
						   onChange={(e) => {
							   actions.setProp("includeGoogleMaps", e.target.checked)
							   if (e.target.checked === true && state.includeLogin === false) {
								   actions.setProp("includeLogin", true)
							   }
						   }}/>
					<span>Include Google Maps</span>
				</label>
				<label className="checkbox-field">
					<i className="ci ci-azure"></i>
					<input id="includeAzureMaps"
						   type="checkbox"
						   disabled={true}
						   checked={state.includeAzureMaps}
						   onChange={(e) => {
							   actions.setProp("includeAzureMaps", e.target.checked)
							   if (e.target.checked === true && state.includeLogin === false) {
								   actions.setProp("includeLogin", true)
							   }
						   }}/>
					<span>Include Azure Maps</span>
				</label>
			</div>
		</div>
	)
}