import { ProvidedRequiredArguments } from 'graphql/validation/rules/ProvidedRequiredArguments';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { createContext } from 'react';
import CreateTaskForm from '../components/CreateTaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import { TaskStatus, useTasksQuery } from '../generated/graphql';
import { withApollo } from '../lib/apollo';

export interface InitialProps {
	ssr: boolean;
}
export interface Props extends InitialProps {}

interface TaskFilterContextValue {
	status?: TaskStatus;
}

export const TaskFilterContext = createContext<TaskFilterContextValue>({});

const IndexPage: NextPage<Props, InitialProps> = ({ ssr }) => {
	const router = useRouter();
	const status = typeof router.query.status === 'string' ? (router.query.status as TaskStatus) : undefined;
	const { data, loading, error, refetch } = useTasksQuery({
		variables: {
			status,
		},
		fetchPolicy: ssr ? 'cache-first' : 'cache-and-network',
	});
	const tasks = data?.tasks;
	if (loading && !tasks) {
		return <p>Loading...</p>;
	} else if (error) {
		return <p>An error occurred!</p>;
	}

	return (
		<TaskFilterContext.Provider value={{ status }}>
			<CreateTaskForm onTaskCreated={refetch} />
			<TaskList tasks={tasks} />
			<TaskFilter />
		</TaskFilterContext.Provider>
	);
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;

IndexPage.getInitialProps = async (ctx) => ({ ssr: !!ctx.req });
// export default withApollo(IndexPage);
// Welcome To NextJs Wih TypeScript and Apollo GrphQL App
