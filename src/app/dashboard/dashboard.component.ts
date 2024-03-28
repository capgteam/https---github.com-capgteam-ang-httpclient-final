import { Component,inject,OnInit,Input,OnDestroy } from '@angular/core';
import { Task } from '../Model/Task';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import { TaskService } from '../Services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  showCreateTaskForm: boolean = false;
  //dependency injection
  http: HttpClient = inject(HttpClient)
  allTasks:Task[]=[]
  editMode:boolean=false
  selectedTask:Task
  currentTaskId:string=''
 // isLoading:boolean=false
  errorMessage:string|null = null
  errSub: Subscription

  taskService: TaskService= inject(TaskService)

  ngOnInit(): void {
   
    this.FetchAllTasks()

     this.errSub= this.taskService.errorSubject.subscribe({next:(err)=>{
      this.setErrorMessage(err)
    }})
  
  }

  ngOnDestroy(): void {
    this.errSub.unsubscribe()
  }

  OpenCreateTaskForm(){
    this.editMode=false
    this.showCreateTaskForm = true;
  }

  CloseCreateTaskForm(){
    this.showCreateTaskForm = false;
  }
  createOrEditTask(data:Task){
   if(!this.editMode)
      this.taskService.CreateTask(data)
   else
    this.taskService.EditTask(this.currentTaskId,data)
    this.showCreateTaskForm = false;
    this.FetchAllTasks()
  }

  FetchAllTasksOnClick(){
    this.FetchAllTasks()
  }
  private FetchAllTasks(){
    //this.isLoading=true
    this.taskService.FetchAllTasks()
      .subscribe({next:(tasks)=>{
        this.allTasks=tasks
      //  this.isLoading=false
      },error:(error)=>{
          this.setErrorMessage(error)
      }
    })
  }


  private setErrorMessage(err: HttpErrorResponse){
    //console.log(err.error.error)
    if(err.error.error === 'Permission denied')
     this.errorMessage='You do not have permission to do this task!'
    else
      this.errorMessage=err.message

     setTimeout(()=>{
      this.errorMessage=null
     },3000)

  }

  deleteTask(id:string | undefined){
   this.taskService.DeleteTask(id)
  
  }

  DeleteAllTasks(){
   this.taskService.DeleteAllTasks()
  
  }

  editOnClick(id:string|undefined){
    this.editMode=true
    this.currentTaskId=id
    this.showCreateTaskForm = true;
    
    this.selectedTask=this.allTasks.find((task) => task.id === id)
   // console.log(this.selectedTask)
  }
}
