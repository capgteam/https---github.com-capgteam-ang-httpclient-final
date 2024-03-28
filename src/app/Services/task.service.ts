import { Injectable,inject } from '@angular/core';
import { Task } from '../Model/Task';
import {HttpClient,HttpHeaders,HttpErrorResponse} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  http: HttpClient = inject(HttpClient)
  errorSubject= new Subject<HttpErrorResponse>()

 CreateTask(task:Task){
  const header=new HttpHeaders({'myheader':'Hello-World'})
  
  this.http.post('https://task-project-6f087-default-rtdb.firebaseio.com/tasks.json',
     // data,{headers:{'myheader':'Hello-World'}})
     task,{headers:header})
      .subscribe({error:(httpErrResponse)=>{
        this.errorSubject.next(httpErrResponse)
      }})
 }

 FetchAllTasks(){
  return this.http.get<{[key:string]:Task}>('https://task-project-6f087-default-rtdb.firebaseio.com/tasks.json')
   
    .pipe(map((response)=>{
          let tasks=[]
          for(let key in response)
          {
            if(response.hasOwnProperty(key))
             //tasks.push(task)
             tasks.push({...response[key],id:key})

          }
          return tasks
      })) 
     
 }

 DeleteTask(id:string|undefined){
  this.http.delete('https://task-project-6f087-default-rtdb.firebaseio.com/tasks/'+id+'.json')
  .subscribe({error:(httpErrResponse)=>{
    this.errorSubject.next(httpErrResponse)
  }})

 }

 DeleteAllTasks(){
  this.http.delete('https://task-project-6f087-default-rtdb.firebaseio.com/tasks.json')
  .subscribe({error:(httpErrResponse)=>{
    this.errorSubject.next(httpErrResponse)
  }})
 
 }

 EditTask(id:string,task:Task){
  this.http.put('https://task-project-6f087-default-rtdb.firebaseio.com/tasks/'+id+'.json',task)
    .subscribe({error:(httpErrResponse)=>{
      this.errorSubject.next(httpErrResponse)
    }})
 }

}
