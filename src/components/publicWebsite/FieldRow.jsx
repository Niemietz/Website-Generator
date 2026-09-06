const FIELD_TYPES = [
	['String', 'String'],
	['Int', 'Int'],
	['Long', 'Long'],
	['Double', 'Double'],
	['Boolean', 'Boolean'],
	['Date', 'Date'],
	['Image', 'Image (remote, cached)'],
];

export default function FieldRow({entityIndex, fieldIndex, field, onChange, onRemove}) {
	const entityFieldName = `field_${fieldIndex}_${entityIndex}`

	return (
		<div className="field-row">
			<input className="field-name"
				name={entityFieldName}
			   	type="text"
			   	placeholder="field name (e.g. title)"
			   	value={field.name}
			   	onChange={(e) => onChange({name: e.target.value})} />
			<select className="field-type" value={field.type}
				onChange={(e) => onChange({type: e.target.value})}>
				{FIELD_TYPES.map(([value, label]) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
			<input className="field-ref" type="text" placeholder="ref entity (for reference)"
			   style={{display: "none"}} />
			<label className="inline-checkbox">
				<input className="field-required"
					type="checkbox"
					checked={field.nullable}
					onChange={(e) => onChange({nullable: e.target.checked})}/>
				required
			</label>
			<label className="inline-checkbox">
				<input className="field-unique"
				   	type="checkbox"
					checked={field.unique}
					onChange={(e) => onChange({unique: e.target.checked})}/>
				unique
			</label>
			<button className="btn btn-danger remove-field" onClick={onRemove}>✕</button>
		</div>
	);
}