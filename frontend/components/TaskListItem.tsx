import React, { useContext } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import {
	Task,
	TasksDocument,
	TasksQuery,
	TasksQueryVariables,
	TaskStatus,
	useChangeStatusMutation,
	useDeleteTaskMutation,
} from '../generated/graphql';
import { TaskFilterContext } from '../pages/[status]';

export interface Props {
	task: Task;
}

const TaskListItem: React.FC<Props> = ({ task }) => {
	const { status } = useContext(TaskFilterContext);
	const [deleteTask, { loading, error }] = useDeleteTaskMutation({
		update: (cache, result) => {
			const data = cache.readQuery<TasksQuery, TasksQueryVariables>({
				query: TasksDocument,
				variables: {
					status,
				},
			});
			if (data) {
				cache.writeQuery<TasksQuery, TasksQueryVariables>({
					query: TasksDocument,
					variables: {
						status,
					},
					data: {
						tasks: data.tasks.filter(({ id }) => id !== result.data?.deleteTask?.id),
					},
				});
			}
		},
	});
	const [changeStatus, { loading: changingStatus, error: changeStatusError }] = useChangeStatusMutation();
	const deleteTaskHandler = () => {
		deleteTask({
			variables: {
				id: task.id,
			},
		});
	};
	const changeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newStatus = task.status === TaskStatus.Active ? TaskStatus.Completed : TaskStatus.Active;
		changeStatus({
			variables: {
				id: task.id,
				status: newStatus,
			},
		});
	};
	useEffect(() => {
		if (error) {
			alert('An error occured while deleting task');
		}
		if (changeStatusError) {
			alert('Error coccured while changing task status ');
		}
	}, [error, changeStatusError]);

	return (
		<li className="task-list-item">
			<label className="checkbox">
				<input
					type="checkbox"
					onChange={changeStatusHandler}
					disabled={changingStatus}
					checked={task.status === TaskStatus.Completed}
				/>
				<span className="checkbox-mark">&#10003;</span>
			</label>
			<Link href="/update/[id]" as={`/update/${task.id}`}>
				<a className="task-list-item-title">{task.title}</a>
			</Link>
			<button disabled={loading} onClick={deleteTaskHandler} className="delete-list-item-button">
				&times;
			</button>
		</li>
	);
};

export default TaskListItem;
