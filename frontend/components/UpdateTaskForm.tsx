import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useUpdateTaskMutation } from '../generated/graphql';

interface Values {
	id: number;
	title: string;
}

export interface Props {
	initialValues: Values;
}
const UpdateTaskForm: React.FC<Props> = ({ initialValues }) => {
	const [values, setValues] = useState<Values>(initialValues);
	const [updateTask, { loading, error, data }] = useUpdateTaskMutation();
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((values) => ({
			...values,
			[name]: value,
		}));
	};
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateTask({
			variables: {
				input: values,
			},
		});
	};

	useEffect(() => {
		if (data && data.updateTask) {
			router.push('/');
		}
	}, [data]);

	return (
		<form onSubmit={handleSubmit}>
			{error && <p className="alert-error">an error occured</p>}
			<p>
				<label htmlFor="#update-input"></label>
				<input
					id="update-input"
					name="title"
					className="text-input"
					type="text"
					value={values.title}
					onChange={handleChange}
				/>
			</p>
			<p>
				<button disabled={loading} type="submit" className="button">
					{loading ? 'Upading...' : 'Save'}
				</button>
			</p>
		</form>
	);
};

export default UpdateTaskForm;
