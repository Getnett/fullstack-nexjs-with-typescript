import Link from 'next/link';
import { Task, TaskStatus } from '../generated/graphql';
import TaskListItem from './TaskListItem';

export interface TaskListProps {
	tasks: Task[] | undefined;
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
	return (
		<ul className="task-list">
			{tasks?.map((task) => (
				<TaskListItem key={task.id} task={task} />
			))}
		</ul>
	);
};

export default TaskList;
