import {Component} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task.model';
import {Store} from "@ngrx/store";
import * as TaskActions from "../../state/task/task.actions";
import * as TaskSelectors from "../../state/task/task.selector";
import {Observable} from "rxjs";

@Component({
  selector: 'app-to-do',
  // standalone: false,
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {
  tasks: Array<Task> = [];
  taskList$!: Observable<Array<Task>>;
  new_task = {title: '', isCompleted: false, description: "", date: ""};

  selectedTask: { description: string; _id: string; title: string; status: string } = {
    _id: '',
    title: '',
    description: '',
    status: 'false',
  };

  constructor(private store: Store<any>, private taskService: TaskService) {
    console.log("constructor")
    taskService.getTasks2().subscribe(req => {

      this.store.dispatch(TaskActions.taskLists({tasks: req.data.getTasks}))
    }, error => {
      console.log(error)
      console.log("error")
      }
    )
    this.taskList$ = this.store.select(TaskSelectors.selectTaskList)
    // this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    // this.$authUser = this.store.select(AuthSelectors.selectAuthUser)

  }

  // ngOnInit() {
  //   console.log("constructor")
  //   this.taskService.getTasks().subscribe(users => {
  //       console.log(users)
  //       console.log("users")
  //       this.store.dispatch(TaskActions.taskLists({tasks: users}))
  //     }
  //   )
  //   this.taskList$ = this.store.select(TaskSelectors.selectTaskList)
  // }

  addTask() {
    const task: { description: string; created_at: Date; _id: string; title: string; status: string } = {
      _id: "0",
      title: this.new_task.title,
      description: this.new_task.description,
      status: "false",
      created_at: new Date(),
    };
    console.log(task);
    this.taskService.addTask(task).subscribe((task: Task) => {
      console.log(task)
      console.log('task')
      this.store.dispatch(TaskActions.addTask({task}))
    });
    // refresh the list
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe((task: Task) => {
      this.store.dispatch(TaskActions.deleteTask({id}))
    });
  }


  selectTask(task: Task) {
    console.log(task, "task",'qq', this.selectedTask)
    this.selectedTask ={ ...task }
  }

  updateTask() {
    console.log(this.selectedTask)
    this.taskService.updateTask(this.selectedTask).subscribe((task: Task) => {
      console.log(task)
      console.log("sssw")
      this.store.dispatch(TaskActions.updateTask({task}))
    });
  }

}
