import { Component, inject, signal } from '@angular/core';
import { PruebaService } from '../../service/prueba.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-prueba',
  imports: [
    ButtonModule
  ],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export default class PruebaComponent {
    pruebaService = inject(PruebaService);
    dato = signal<any>(null);

    enviar(): void{
        this.pruebaService.prueba().subscribe({
            next:(data) =>{
                this.dato.set(data.mensaje);
            },
            error: () =>{
                this.dato.set("fallo");
            }
        })
    }

}
