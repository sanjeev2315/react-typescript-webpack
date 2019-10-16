import * as React from 'react';
import { string } from 'prop-types';

export interface IAppState {
	currentTask: string,
	tasks:Array<ITask>
}

export interface ITask{
	id: number,
	value: string,
	completed:boolean
}

export class App extends React.Component<{}, IAppState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			currentTask: '',
			tasks:[]
		}
}
	public handleSubmit(e: React.FormEvent<HTMLFormElement>) : void {
		e.preventDefault();	
		this.setState({
			currentTask: '',
			tasks: [
				...this.state.tasks,
				{
					id: this._timeInMilliseconds(),
					value: this.state.currentTask,
					completed: false
				}
			]
		})
	}
	
	public renderTasks(): JSX.Element[]{
		return this.state.tasks.map((task: ITask, index: number ) =>{
			return (
				<div key={task.id} className = 'tdl-task'>
					<span className={task.completed ? 'is-completed' : ''} >{task.value}</span>
					<button onClick={() => this.deleteTask(task.id)}> Delete
					</button>
					<button onClick={() => this.toggleTaskStatus(index)}> 
						{task.completed ? 'Undo' : 'Done'}
					</button>
				</div>
			)
		})
	}

	public render() : JSX.Element{
	  return (
		<div>
		<h1>React To Do List</h1>
		<form onSubmit = {(e) => this.handleSubmit(e)}>
				  <input type='text' className ='tdl-input' value= {this.state.currentTask} placeholder='Add a task' onChange={(e)=> this.setState({currentTask: e.target.value})}/>
			<button type='submit'> Add Task</button>
			  </form>
			  <section>
				  {this.renderTasks()}
			  </section>
		</div>
	);
	}
	
	private _timeInMilliseconds():number {
		const date: Date = new Date();
		return date.getUTCMilliseconds()
	}

	private deleteTask(id: number): void {
		const tasks = this.state.tasks.filter((task: ITask) => task.id != id)		
		this.setState({tasks})		
	}

	private toggleTaskStatus(index: number): void {
		let task: ITask[] = this.state.tasks.splice(index, 1) 
		task[0].completed = !task[0].completed 
		const tasks: ITask[] = [...this.state.tasks, ...task]
		this.setState({tasks})			
	}


}

