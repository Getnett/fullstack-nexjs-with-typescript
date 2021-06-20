import React, { useState } from 'react';
import { useCreateTaskMutation, useUpdateTaskMutation } from '../generated/graphql';

export interface Props {
	onTaskCreated: () => void;
}

const CreateTaskForm: React.FC<Props> = ({ onTaskCreated }) => {
	const [title, setTitle] = useState('');
	const [createTask, { loading, error }] = useCreateTaskMutation({
		onCompleted: () => {
			onTaskCreated();
			setTitle('');
		},
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!loading && title) {
			createTask({
				variables: {
					input: {
						title: title,
					},
				},
			});
		}
	};
	return (
		<form onSubmit={handleSubmit}>
			{error && <p className="alert-error">{error.message}</p>}
			<input
				type="text"
				name="title"
				placeholder="Task to add"
				autoComplete="off"
				className="text-input new-task-text-input"
				value={title}
				onChange={handleChange}
			/>
		</form>
	);
};

export default CreateTaskForm;
