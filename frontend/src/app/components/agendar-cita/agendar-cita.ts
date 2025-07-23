import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap'; 

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.html',
  styleUrls: ['./agendar-cita.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AgendarCitaComponent implements OnChanges {
  @Input() cita: any = null;
  @Input() esModal: boolean = false;
  form: FormGroup;
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cita'] && this.cita) {
      this.form.patchValue(this.cita);
    }
  }

  agendar() {
    if (this.form.valid) {
      this.citasService.agendarCita(this.form.value).subscribe({
        next: () => {
          this.mensaje = 'Cita agendada exitosamente';

          if (this.esModal) {
            const modal = bootstrap.Modal.getInstance(
              document.getElementById('agendarModal')!
            );
            modal?.hide();
          } else {
            this.router.navigate(['/listar']);
          }
        },
        error: () => {
          this.mensaje = 'Error al agendar cita. Intente nuevamente.';
        },
      });
    }
  }

  actualizar() {
    if (this.form.valid) {
      this.citasService
        .actualizarCita(this.cita._id, this.form.value)
        .subscribe({
          next: () => {
            this.mensaje = 'Cita actualizada exitosamente';
            const modal = bootstrap.Modal.getInstance(
              document.getElementById('editarModal')!
            );
            modal?.hide();
          },
          error: () => {
            this.mensaje = 'Error al actualizar la cita. Intente nuevamente.';
          },
        });
    }
  }
}
