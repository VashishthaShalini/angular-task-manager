import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  searchText: string = '';
  filter: string = 'all';
  taskInput: string = '';
  tasks: { title: string; completed: boolean; isEditing?: boolean }[] = [];
  
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  addTask() {
    if (this.taskInput.trim()) {
      this.tasks.push({
        title: this.taskInput,
        completed: false,
      });
      this.taskInput = '';
      this.saveTasks(); // 👈 ADD THIS
    }
  }

  deleteTask(task: any) {
    this.tasks = this.tasks.filter((t) => t !== task);
    this.saveTasks(); // 👈 ADD THIS
  }

  getFilteredTasks() {
  let filtered = this.tasks;

  // Filter by status
  if (this.filter === 'completed') {
    filtered = filtered.filter(task => task.completed);
  } else if (this.filter === 'pending') {
    filtered = filtered.filter(task => !task.completed);
  }

  // Filter by search
  if (this.searchText.trim()) {
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  return filtered;
}

  ngOnInit() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  startEdit(task: any) {
  task.isEditing = true;
}

saveEdit(task: any) {
  task.isEditing = false;
  this.saveTasks();
}
}
