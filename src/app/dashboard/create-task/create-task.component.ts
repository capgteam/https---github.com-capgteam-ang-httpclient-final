import { Component, EventEmitter, Output,Input,ViewChild,AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/Model/Task';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements AfterViewInit  {
  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EventEmittedData: EventEmitter<Task> = new EventEmitter<Task>()

  @Input() isEditMode:boolean
  @Input() selectedTask:Task
  @ViewChild('taskForm') taskForm:NgForm


  ngAfterViewInit(){
   // console.log('After View Init.....')
  //  console.log(this.selectedTask)
  setTimeout(()=>{
    this.taskForm.form.patchValue(this.selectedTask)
  },0)
    
  }

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  createTask(taskForm:NgForm){
    //console.log(taskForm.value)
    this.isEditMode=false
    this.EventEmittedData.emit(taskForm.value)

    taskForm.setValue({
      title:'',
      description:'',
      assignedTo:'',
      createdAt:'',
      priority:'',
      status:''
    })

  }
}