import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../../shared/components/loader/loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule ,MatProgressBarModule]
})
export class LoaderComponent implements OnInit {
  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
