import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../../../shared/components/loader/loader.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MatProgressSpinnerModule],
})
export class LoaderComponent implements OnInit {
  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void { }
}
