import Link from 'next/link';
import { useContext } from 'react';
import { TaskStatus } from '../generated/graphql';
import { TaskFilterContext } from '../pages/[status]';

export interface Props {}

const TaskFilter: React.FC<Props> = () => {
	const { status } = useContext(TaskFilterContext);
	return (
		<ul className="task-filter">
			<li>
				<Link href="/">
					<a className={!status ? 'task-filter-active' : ''}>All</a>
				</Link>
			</li>
			<li>
				<Link href="/[status]" as={`/${TaskStatus.Active}`}>
					<a className={status === TaskStatus.Active ? 'task-filter-active' : ''}>Active</a>
				</Link>
			</li>
			<li>
				<Link href="/[status]" as={`/${TaskStatus.Completed}`}>
					<a className={status === TaskStatus.Completed ? 'task-filter-active' : ''}>Compeleted</a>
				</Link>
			</li>
		</ul>
	);
};

export default TaskFilter;