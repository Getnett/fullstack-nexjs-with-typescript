import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import UpdateTaskForm from '../../components/UpdateTaskForm';
import { useTaskQuery } from '../../generated/graphql';
import { withApollo } from '../../lib/apollo';

export interface UpdateTskPageProps {}

const UpdateTskPage: NextPage = () => {
	const router = useRouter();
	console.log('[ID:::]', typeof router.query.id);
	const id = typeof router.query.id === 'string' ? parseInt(router.query.id) : NaN;
	const { loading, error, data } = useTaskQuery({
		variables: {
			id,
		},
	});
	const task = data?.task;
	if (loading) {
		return <p>Loading...</p>;
	} else if (error) {
		return <p>An error occured</p>;
	}
	return (
		<>
			<h2>Update Page </h2>
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>An Error occured</p>
			) : (
				<UpdateTaskForm
					initialValues={{
						id: task?.id === undefined ? NaN : task.id,
						title: task?.title === undefined ? '' : task.title,
					}}
				/>
			)}
		</>
	);
};

export default withApollo(UpdateTskPage);
