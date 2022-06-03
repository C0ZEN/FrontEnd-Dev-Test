import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PVMiseEnService } from './pvmes.models';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PvmesService {
  constructor(private httpClient: HttpClient) {}

  createPvmes(pvmes: PVMiseEnService): Observable<PVMiseEnService> {
    return this.httpClient.post<PVMiseEnService>(
      `${environment.apiBase}/pv_mise_en_services`,
      pvmes
    );
  }
}
