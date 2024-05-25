import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-base',
  templateUrl: './header-base.component.html',
  styleUrls: ['./header-base.component.scss'],
  standalone: true,
  imports: [CommonModule ,MatButtonModule, RouterModule]
})
export class HeaderBaseComponent {
  @Input({required: true}) public headerList!: {urlLink: string, text: string}[]

}
