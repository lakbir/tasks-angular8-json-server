import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];
  resultTtasks: Task[] = [];
  myTask: Task = {label:'',completed:false};
  editForm = false;
  showForm = false;
  mcSearch = '';
  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
      .subscribe((tasks) => {
      this.resultTtasks = this.tasks = tasks;
      });
  }

  deleteTask(id: number) {
    this.taskService.delete(id).subscribe(()=>{
      this.tasks = this.tasks.filter(task => task.id != id);
    })
  }

  persistTask(){
    this.taskService.persist(this.myTask)
      .subscribe((task)=>{
        this.tasks = [task,...this.tasks];
        this.resetTask();
        this.showForm = false;
      })
  }

  resetTask(){
    this.myTask = {
      label:'',
      completed: false
    }
  }

  toggleCompleted(task){
    this.taskService.completed(task.id, task.completed)
      .subscribe(()=>{
        task.completed = !task.completed;
      })
  }

  editTask(task){
    this.myTask = task;
    this.showForm = true;
    this.editForm = true;
  }

  updateTask() {
    this.taskService.update(this.myTask)
      .subscribe((task)=>{
        this.resetTask();
        this.editForm = false;
      })
  }

  searchTasks(){
    this.resultTtasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.mcSearch.toLowerCase()));
  }
}
