import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddVentaComponent } from './add-venta/add-venta.component';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent {

  readonly width: string = '600px';
  public lista: any[] = [];
  public columnas: string[] = ['fecha', 'producto', 'precio', 'cantidad', 'total', 'idTransaccion'];

  constructor(private _ventaService: VentaService, public dialog: MatDialog, public snack: MatSnackBar) {}

  ngOnInit(): void{
    this.getVentasHome()
  }

  getVentasHome(){
    this._ventaService.getVentasHome().subscribe(response => {
      this.lista = response.data
    })
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddVentaComponent, { width: this.width })
  }

}
