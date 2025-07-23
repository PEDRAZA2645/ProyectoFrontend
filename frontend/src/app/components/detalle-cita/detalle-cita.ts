import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { CommonModule, DatePipe } from '@angular/common';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.html',
  styleUrls: ['./detalle-cita.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class DetalleCitaComponent implements OnInit {
  @Input() cita: any;
  mensaje = '';

  constructor(
    private route: ActivatedRoute,
    private citasService: CitasService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.citasService.obtenerCitaPorId(id).subscribe({
        next: (data) => {
          this.cita = data;
        },
        error: () => {
          this.mensaje = 'No se pudo cargar la cita.';
        }
      });
    }
  }

  cerrarModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('detalleModal')!); // Obtiene la instancia del modal
    modal?.hide();
  }
}
