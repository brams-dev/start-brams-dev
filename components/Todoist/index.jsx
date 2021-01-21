import axios from 'axios';
import useSWR from 'swr';

function useTasks(token) {
	const { data, error } = useSWR(token && 'https://api.todoist.com/rest/v1/tasks?filter=today|overdue', async (url) => {
		const response = await axios.get(url, {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		return response.data;
	});

	return {
		tasks: data,
		isLoading: !data && !error,
		error
	};
}

const sortByPriority = (a, b) => b.priority - a.priority;

export default function Todoist(props) {
	const { tasks } = useTasks(props.token);

	if (!tasks) return null;

	console.log(tasks);

	const overdue = tasks.filter(t => {
		const dueDate = new Date(t.due.date);
		const today = new Date((new Date()).toDateString());
		return dueDate < today;
	}).sort(sortByPriority);
	const today = tasks.filter(t => {
		const dueDate = new Date(t.due.date);
		const day = dueDate.getDate();
		const month = dueDate.getMonth();
		const year = dueDate.getFullYear();

		const now = new Date();
		const dayNow = now.getDate();
		const monthNow = now.getMonth();
		const yearNow = now.getFullYear();

		return day === dayNow && month === monthNow && year === yearNow;
	}).sort(sortByPriority);

	const renderTaskList = tasks => (
		<ul className='tasks-list'>
			{tasks.map(task => (
				<li className={`task priority--${task.priority}`} key={task.id}>
					<span className='circle'></span>
					<a href={task.url} target='__blank' rel='noopener'>
						{task.content}
					</a>
				</li>
			))}
		</ul>
	);

	return (
		<div className='Todoist' style={{ backgroundColor: `rgba(0, 0, 0, ${props.opacity ?? 0.5})` }}>
			{overdue?.length > 0 && 
				<div className='tasks overdue'>
					<h3>Overdue</h3>
					{renderTaskList(overdue)}
				</div>
			}

			{today?.length > 0 &&
				<div className='tasks today'>
					<h3>Today</h3>
					{renderTaskList(today)}
				</div>
			}

			{tasks?.length <=0 && (
				<div className='no-tasks'>
					No more tasks for today 🎉
				</div>
			)}
		</div>
	);
}
