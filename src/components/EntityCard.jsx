import FieldRow from './FieldRow';

export default function EntityCard({entity, index, actions}) {
	const entityFieldName = `entity_${index}`

	return (
		<div className="entity">
			<div className="row space-between">
				<label className="field grow">
					<span>Entity name (e.g. Product, Order)</span>
					<input
						name={entityFieldName}
						className="entity-name"
						type="text"
				   		value={entity.name}
				   		onChange={(e) => actions.updateEntity(entity.id, {name: e.target.value})}
					/>
				</label>
				<button className="btn btn-danger remove-entity"
					onClick={() => actions.removeEntity(entity.id)}>Remove entity</button>
			</div>

			<div className="fields">
				{entity.fields.map((field, fieldIndex) => (
					<FieldRow
						key={field.id}
						entityIndex={index}
						fieldIndex={fieldIndex}
						field={field}
						onChange={(patch) => actions.updateField(entity.id, field.id, patch)}
						onRemove={() => actions.removeField(entity.id, field.id)}
					/>
				))}
			</div>
			<button className="btn btn-secondary add-field" type="button" onClick={() => actions.addField(entity.id)}>+ Add field</button>
		</div>
	);
}
