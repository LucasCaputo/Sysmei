import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public firstload = signal(true);

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public setFirstLoad(status: boolean): void {
    this.firstload.set(status);
  }
}
