import { Routes } from '@angular/router';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita';
import { ListarCitasComponent } from './components/listar-citas/listar-citas';
import { DetalleCitaComponent } from './components/detalle-cita/detalle-cita';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'listar-citas', pathMatch: 'full' },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'listar-citas', component: ListarCitasComponent },
  { path: 'detalle-cita/:id', component: DetalleCitaComponent },
  { path: '**', redirectTo: 'listar-citas' }
];
