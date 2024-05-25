import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-schedule-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule],
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss']
})
export class ScheduleHeaderComponent {
  @Output() private addButtonClick = new EventEmitter();
  @Output() private menuButtonClick = new EventEmitter();
  @Input({required: true})  public calendarDateTitle!: string;

  public onAddButtonClick() {
    this.addButtonClick.emit();
  }

  public onMenuButtonClick() {
    this.menuButtonClick.emit()
  }

}
