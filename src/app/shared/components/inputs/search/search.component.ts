import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input({ required: true }) search!: FormControl<string | null>;
}
