import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline, arrowBackOutline } from 'ionicons/icons';
import { Materia } from 'src/app/interfaces/materia';
import { StorageService } from 'src/app/services/storage.service';
import { Nota } from 'src/app/interfaces/nota';
import { Unit } from 'src/app/interfaces/unit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
  ],
})
export class NotasComponent implements OnInit{
  public isAddNoteModalOpen: boolean = false;

  public isSubjectModalOpen: boolean = false;
  public selectedSubject!: Materia;

  public selectedUnit!: Unit;

  public arrSubjects: Materia[] = [];

  public subjectNameInp: string = '';
  public teacherNameInp: string = '';

  public noteValueInp: number = 0;
  public noteDescriptionInp: string = '';

  constructor(public storageService: StorageService) {
    addIcons({
      addOutline,
      arrowBackOutline,
    });
  }

  ngOnInit(): void {
    this.arrSubjects = this.loadSubjects();
  }

  public subjectModal(value: boolean, subject: Materia) {
    this.isSubjectModalOpen = false;
    this.isSubjectModalOpen = value;

    this.selectedSubject = subject;    
  }

  public closeSubjectModal() {
    this.isSubjectModalOpen = false;
  }

  public addSubject() {
    if (this.subjectNameInp && this.teacherNameInp) {
      const newSubject: Materia = {
        name: this.subjectNameInp,
        nameTeacher: this.teacherNameInp,
        units: [
          {
            name: 'I',
            notes: [],
            id: this.generateId(),
          },
          {
            name: 'II',
            notes: [],
            id: this.generateId(),
          },
          {
            name: 'III',
            notes: [],
            id: this.generateId(),
          }
        ],
        id: this.generateId()
      }

      this.arrSubjects.push(newSubject);
      this.saveSubjects();
    }
  }

  public addNoteModal(value: boolean, unit: Unit) {
    this.isAddNoteModalOpen = false;
    this.isAddNoteModalOpen = value;

    this.selectedUnit = unit;
  }

  public addNote() {
    if (!this.noteValueInp && !this.noteDescriptionInp) return;
    
    const newNote: Nota = {
      value: this.noteValueInp,
      description: this.noteDescriptionInp,
      id: this.generateId(),
    }

    this.arrSubjects.forEach((subject) => {
      subject.units.forEach((item) => {
        if (item.id === this.selectedUnit.id) item.notes.push(newNote);
      });
    });

    this.saveSubjects();
    this.clearForms();

    this.isAddNoteModalOpen = false;
  }

  public deletarNote(note: Nota) {
    this.arrSubjects.forEach((subject) => {
      subject.units.forEach((unit) => {
        const index = unit.notes.findIndex(item => item.id === note.id);
        const confirm = window.confirm(`Dejesa deletar a nota "${unit.notes[index].description}"?`);
        
        if (!confirm) return;
        
        unit.notes.splice(index, 1);
        this.saveSubjects();
      })
    });
  }

  public calculateSumeNotes(notes: Nota[]): number {
    let total: number = 0;
    notes.forEach((note) => total += note.value);

    return total;
  }

  public calculateNotesAverages(units: Unit[]): number {
    let average: number = 0;
    units.forEach((unit) => average += this.calculateSumeNotes(unit.notes));

    average = average / units.length;

    return average;
  }

  private generateId(): string[36] {
    return Math.floor(Date.now() * Math.random()).toString(36);
  }

  private saveSubjects(): void {    
    this.storageService.setItem('onrange-subjects', this.arrSubjects);
  }

  private loadSubjects(): Materia[] {
    const savedSubjects: Materia[] | null = this.storageService.getItem('onrange-subjects');
    if (savedSubjects) return savedSubjects;
    return [];
  }

  private clearForms() {
    this.subjectNameInp = '';
    this.teacherNameInp = '';
    this.noteValueInp = 0;
    this.noteDescriptionInp = '';
  }
}