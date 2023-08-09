import { Component, OnInit } from '@angular/core';
import { ApiDopperService } from '../api-dopper.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doppers',
  templateUrl: './doppers.component.html',
  styleUrls: ['./doppers.component.css']
})
export class DoppersComponent implements OnInit {

  loggedInUsername: string;
  registros: any[] = [];
  showModal: boolean = false;
  nuevoDopperNombre: string = '';
  idEmpresa: any;

  constructor(private apiDopperService: ApiDopperService) {
    this.loggedInUsername = localStorage.getItem('loggedinusername') ?? ''; // Asignar un valor predeterminado si es null
  }

  ngOnInit(): void {
    this.apiDopperService.getIdEmpresa(this.loggedInUsername).subscribe(
      (data) => {

        console.log(data.data.id_empresa); // Aquí obtendrás los datos de la respuesta de la solicitud HTTP
        localStorage.setItem('id_empresa', data.data.id_empresa); // Guardar el nombre de usuario en el LocalStorage
        // Guardar el nombre de usuario en el LocalStorage
        this.getRegistrosPorEmpresa(data.data.id_empresa);
      },
      (error) => {
        console.error(error); // Manejo de errores si ocurriera algún problema en la solicitud HTTP
      }
    );
  }


  // Función para obtener los registros por empresa
  getRegistrosPorEmpresa(idEmpresa: any): void {
    this.apiDopperService.getDevicesPorEmpresa(idEmpresa).subscribe(
      (data) => {
        console.log("data", data);
        this.registros = data.data;
      },
      (error) => {
        console.error('Error al obtener registros:', error);
      }
    );
  }


  // Función para insertar un nuevo device en una empresa
  insertDeviceEnEmpresa(): void {
    let idEmpresa_add = localStorage.getItem('id_empresa');
    const nuevoDevice = {
      device: 'nuevo_device',
      id_empresa: idEmpresa_add
    };

    this.apiDopperService.insertDeviceEmpresa(nuevoDevice).subscribe(
      (data) => {
        console.log('Device insertado correctamente:', data);
      },
      (error) => {
        console.error('Error al insertar el device:', error);
      }
    );
  }



  deleteDevice(device: any) {
    let idEmpresa_add = localStorage.getItem('id_empresa');
    console.log(this.loggedInUsername, device);

    this.apiDopperService.deleteDeviceEmpresa(idEmpresa_add, device)
      .subscribe(
        response => {
          console.log('Delete successful:', response);
        },
        error => {
          console.error('Delete error:', error);
        }
      );
    setTimeout(() => {
      location.reload();
    }, 1000);
  }




  agregarDopper(): void {
    let idEmpresa_add = localStorage.getItem('id_empresa');

    const nuevoDopper = {
      device: this.nuevoDopperNombre,
      id_empresa: idEmpresa_add
    };

    this.apiDopperService.insertDeviceEmpresa(nuevoDopper).subscribe(
      (data) => {
        console.log('Device insertado correctamente:', data);
        this.registros.push(nuevoDopper);
        this.nuevoDopperNombre = '';
        this.showModal = false;
      },
      (error) => {
        console.error('Error al insertar el device:', error);
      }
    );
    setTimeout(() => {
      location.reload();
    }, 1000);








  }
}
