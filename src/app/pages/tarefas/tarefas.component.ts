import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, chevronDownOutline, chevronUpOutline, closeOutline, menuOutline, trashOutline } from 'ionicons/icons';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class TarefasComponent implements OnInit {
  @ViewChild('taskNameInpElement') taskNameInpElement!: any;

  public taskNameInp: string = '';
  public taskDescriptionInp: string = '';

  public taskList: Task[] = [];
  public taskCompletedList: Task[] = [];

  public taskListOpen: boolean = true;
  public taskCompletedListOpen: boolean = false;

  constructor(private storageService: StorageService) {
    addIcons({
      addOutline,
      closeOutline,
      trashOutline,
      chevronDownOutline,
      chevronUpOutline,
      menuOutline,
    });
  }

  ngOnInit(): void {
    this.loadTaskList();
    this.loadTaskCompletedList();
  }

  public addTask(): void {
    if (this.taskNameInp) { 
      const newTask = new Task(this.capitalizeFirstLetter(this.taskNameInp), this.capitalizeFirstLetter(this.taskDescriptionInp), this.generateId(), false);
      this.taskList.push(newTask);
    }

    this.saveTask();
    this.clearInp();
  }

  public deleteTask(id: string) {
    const index = this.taskList.findIndex(task => task.id === id);
    const confirm = window.confirm(`Dejesa deletar a tarefa "${this.taskList[index].name}"?`);

    if (!confirm) return;

    this.taskList.splice(index, 1);
    this.saveTask();
  }

  public deleteAllCheckedtasks() {
    const comfirm = window.confirm('Isso deletará todas as tarefas já concluídas! Deseja deletar?');

    if (comfirm) {
      this.taskCompletedList = [];
      this.saveCompletedTask();
    }
  }

  public deleteCompletedTask(id: string) {
    const index = this.taskList.findIndex(task => task.id === id);
    this.taskCompletedList.splice(index, 1);

    this.saveCompletedTask();
  }

  public markDone(id: string): void {
    const index = this.taskList.findIndex(task => task.id === id);
  
    if (index !== -1) {
      const [completedTask] = this.taskList.splice(index, 1);
      this.taskCompletedList.push(completedTask);

      this.saveTask();
      this.saveCompletedTask();
    }
  }
  
  public markNotDone(id: string) {
    const index = this.taskCompletedList.findIndex(task => task.id === id);
  
    if (index !== -1) {
      const [completedTask] = this.taskCompletedList.splice(index, 1);
      this.taskList.push(completedTask);

      this.saveTask();
      this.saveCompletedTask();
    }
  }

  private capitalizeFirstLetter(text: string): string {
    if (!text) return text; // Verifica se a string é vazia ou nula
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private generateId(): string[36] {
    return Math.floor(Date.now() * Math.random()).toString(36);
  }

  public clearInp(): void {
    this.taskNameInp = '';
    this.taskDescriptionInp = '';
  }
  
  private loadTaskList() {
    const savedTask: Task[] | null = this.storageService.getItem('onrange-task');
    if (savedTask) this.taskList = [...savedTask];    
  }

  private loadTaskCompletedList() {
    const savedCompletedTask: Task[] | null = this.storageService.getItem('onrange-completed-task');
    if (savedCompletedTask) this.taskCompletedList = [...savedCompletedTask];    
  }

  private saveTask(): void {    
    this.storageService.setItem('onrange-task', this.taskList);
  }

  private saveCompletedTask(): void {
    this.storageService.setItem('onrange-completed-task', this.taskCompletedList);
  }

  public setFocusInpTaskName() {
    setTimeout(() => this.taskNameInpElement.setFocus(), 200);
  }
}

class Task {
  constructor(public name: string, public description: string, public id: string, public checked: boolean) {}
}