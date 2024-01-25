import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VentaService } from 'src/app/services/venta.service';
import { Venta } from 'src/app/interfaces/venta';
import { DetalleVenta } from 'src/app/interfaces/detalle-venta';

@Component({
  selector: 'app-add-venta',
  templateUrl: './add-venta.component.html',
  styleUrls: ['./add-venta.component.scss']
})
export class AddVentaComponent {

  public venta!: Venta
  public detalles!: DetalleVenta[]

  public detallesForm = this.formBuilder.group({
    idProducto: [0, Validators.required],
    cantidad: [0, Validators.required],
    total: [1, Validators.required]
  })

  constructor(public dialogRef : MatDialogRef<AddVentaComponent>,
              public snack: MatSnackBar,
              private formBuilder: FormBuilder,
              public _ventaService: VentaService
  ){
    this.detalles = []
    this.venta = {
      idVenta: 0,
      idUsuario: 1,
      contacto: '',
      telefono: '',
      direccion: '',
      idDistrito: '',
      detalleVenta: []
    }
  }

  close(){
    this.dialogRef.close()
  }

  addDetalle(){
    this.detalles.push(this.detallesForm.value)
  }

  addVenta() {
    this.venta.detalleVenta = this.detalles
    this._ventaService.addVenta(this.venta).subscribe(resp => {
      if(resp.exito === 1){
        this.dialogRef.close()
        this.snack.open('La venta se ha realizado con exito', 'Listo!', {
          duration: 2000
        })
      }
    })
  }


}
