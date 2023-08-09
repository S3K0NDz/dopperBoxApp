import { Component } from '@angular/core';
import { ApiDopperService } from '../api-dopper.service';
import * as Excel from 'exceljs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html', // Aquí utilizamos el nombre del archivo HTML personalizado
})
export class DashboardComponent {
  loggedInUsername: string;
  loggedInIdEmpresa: any;
  registros: any[] = [];
  responseData: any;


  modalVisible: boolean = false;

  selectedRegistro: any = {}; // Inicializar con un objeto vacío

  constructor(private apiDopperService: ApiDopperService, private http: HttpClient) {
    this.loggedInUsername = localStorage.getItem('loggedinusername') ?? ''; // Asignar un valor predeterminado si es null
    this.loggedInIdEmpresa = localStorage.getItem('loggedInIdEmpresa') ?? ''; // Asignar un valor predeterminado si es null

  }

  ngOnInit() {

    this.getRegistrosPorEmpresa(this.loggedInUsername);
  
  }


  generateExcel() {
    // Crear un nuevo libro de Excel
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Registros Dopper');

    // Agregar el título con el nombre de usuario
    worksheet.addRow(['Registros Dopper', this.loggedInUsername]);

    // Agregar una fila para los encabezados de la tabla
    const headers = ['ID', 'Valor', 'Fecha y Hora', 'Dopper'];
    worksheet.addRow(headers);

    // Agregar los datos de la tabla
    this.registros.forEach(registro => {
      worksheet.addRow([registro.id, registro.valor, registro.fecha_hora, registro.device]);
    });

    // Guardar el archivo
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'registros_dopper.xlsx';
      a.click();
    });
  }


  getAllRegistros() {
    this.apiDopperService.getRegistros().subscribe(
      (data) => {
        this.registros = data.data;
      },
      (error) => {
        console.error('Error al obtener los registros:', error);
      }
    );
  }

  getRegistrosPorEmpresa(nombreEmpresa: string) {
    this.apiDopperService.getRegistrosPorEmpresa(nombreEmpresa).subscribe(
      (data) => {
        this.registros = data.data;
      },
      (error) => {
        console.error('Error al obtener los registros por empresa:', error);
      }
    );
  }


  deleteRegistro(id: any) {

    this.apiDopperService.deleteRegistro(id).subscribe(
      () => {
        console.log('Registro eliminado correctamente.');
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
      }
    );
    setTimeout(() => {
      location.reload();
     }, 1000);

  }



  // Function to open the modal and set the selectedRegistro
  openUpdateModal(registro: any) {
    this.selectedRegistro = { ...registro };
    this.modalVisible = true;
  }

  // Function to close the modal and reset the selectedRegistro
  closeModal() {
    this.selectedRegistro = null;
    this.modalVisible = false;
  }

  // Function to update the registro
  updateRegistro() {
    this.apiDopperService.updateRegistro(this.selectedRegistro).subscribe(
      () => {
        console.log('Registro actualizado correctamente.');
        // Aquí puedes realizar alguna acción adicional después de actualizar el registro.
        this.closeModal();
        setTimeout(() => {
          location.reload();
         }, 1000);
        
      },
      (error) => {
        console.error('Error al actualizar el registro:', error);
      }
    );
   
  }

  refresh(){
    location.reload();
  }








}

