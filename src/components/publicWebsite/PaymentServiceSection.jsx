export function PaymentServiceSection({state, actions}) {
	return (
		<div className="card">
			<h2>Payment Service (Work in Progress 🚧)</h2>
			<div className="row">
				<label className="checkbox-field">
					<i>🛒</i>
					<input id="includePaymentService"
						type="checkbox"
					   	disabled={true}
						checked={state.includePaymentService}
						onChange={(e) => {
							actions.setProp("includePaymentService", e.target.checked)
							if (e.target.checked === true && state.includeLogin === false) {
								actions.setProp("includeLogin", true)
							}
						}}/>
					<span>Include Payment Service{state.includePaymentService === true && " (Ok, now choose a database above ☝️)"}</span>
				</label>
				{state.includePaymentService === true &&
				<fieldset style={{border: 'none', padding: '0px'}} className="checkbox-field">
					<div style={{margin: '-3px'}}>
						<img src="/Website-Generator/256x256/mercadoPago.ico" className="icon" alt=""/>
						<input type="radio" id="includeMercadoPago" name="paymentService" value="mercadoPago"
							   checked={state.includeMercadoPago === true}
							   onChange={(e) => {
								   actions.setProp("includeMercadoPago", true)
								   actions.setProp("includePagBank", false)
							   }}/>
						<label htmlFor="includeMercadoPago">Include Mercado Pago</label>
					</div>
					<div style={{margin: '-3px'}}>
						<img src="/Website-Generator/256x256/pagbank.ico" className="icon" alt=""/>
						<input type="radio" style={{marginTop: '4px'}} id="includePagBank" name="paymentService" value="pagBank"
							   checked={state.includePagBank === true}
							   onChange={(e) => {
								   actions.setProp("includePagBank", true)
								   actions.setProp("includeMercadoPago", false)
							   }}/>
						<label htmlFor="includePagBank">Include PagBank</label>
					</div>
				</fieldset>
				}
			</div>
		</div>
	)
}