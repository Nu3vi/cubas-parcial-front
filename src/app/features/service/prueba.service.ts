import { Injectable } from '@angular/core';
import { AppService } from '../../shared/services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService extends AppService{
    prueba(): Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/api/v1/test`);
    }
}
