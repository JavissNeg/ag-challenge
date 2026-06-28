import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Service()
export class Api {

    protected readonly http = inject(HttpClient);

    protected readonly apiUrl = environment.apiUrl;

}