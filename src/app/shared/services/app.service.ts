import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    protected readonly http = inject(HttpClient);
    protected readonly apiUrl: string = environment.apiUrl;

    constructor() { }
}
