import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DetalleCitaComponent } from '../detalle-cita/detalle-cita';
import { AgendarCitaComponent } from '../agendar-cita/agendar-cita';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-listar-citas',
  templateUrl: './listar-citas.html',
  styleUrls: ['./listar-citas.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe, DetalleCitaComponent, AgendarCitaComponent],
})
export class ListarCitasComponent implements OnInit {
  citas: any[] = [];
  mensaje = '';
  citaSeleccionada: any = null;

  constructor(
    private citasService: CitasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCitas();
  }

  obtenerCitas() {
    this.citasService.obtenerCitas().subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: () => {
        this.mensaje = 'Error al cargar las citas.';
      }
    });
  }

   verDetalle(id: string) {
    this.citasService.obtenerCitaPorId(id).subscribe({
      next: (data) => {
        this.citaSeleccionada = data;
        const modal = new bootstrap.Modal(document.getElementById('detalleModal')!); // Obtiene el modal por su ID
        modal.show();
      },
      error: () => {
        this.mensaje = 'No se pudo cargar la información de la cita.';
      }
    });  
  }

  editarCita(id: string) {
    this.citasService.obtenerCitaPorId(id).subscribe({
      next: (data) => {
        this.citaSeleccionada = data;
        const modal = new bootstrap.Modal(document.getElementById('editarModal')!); // Abre el modal
        modal.show();
      },
      error: () => {
        console.error('Error al cargar los datos de la cita.');
      }
    });
  }

  eliminarCita(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      this.citasService.eliminarCita(id).subscribe({
        next: () => {
          this.citas = this.citas.filter(cita => cita._id !== id);
          this.mensaje = 'Cita eliminada exitosamente.';
        },
        error: () => {
          this.mensaje = 'Error al eliminar la cita. Intente nuevamente.';
        }
      });
    }
  }

  navegar(ruta: string) {
  this.router.navigate([ruta]);
}

}
