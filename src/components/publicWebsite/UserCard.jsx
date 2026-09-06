export default function UserCard({user, index, actions}) {
	const userName = `user_name_${index}`
	const userPasswordName = `user_password_${index}`

	return (
		<div className="entity">
			<div className="row space-between">
				<label className="field grow">
					<span>Name</span>
					<input
						name={userName}
						className="entity-name"
						type="text"
				   		value={user.name}
				   		onChange={(e) => actions.updateUser(user.id, {name: e.target.value})}
					/>
				</label>
				<label className="field grow">
					<span>Password</span>
					<input
						name={userPasswordName}
						className="entity-name"
						type="text"
				   		value={user.password}
				   		onChange={(e) => actions.updateUser(user.id, {password: e.target.value})}
					/>
				</label>
				<button className="btn btn-danger remove-entity"
					onClick={() => actions.removeUser(user.id)}>Remove</button>
			</div>
		</div>
	);
}
