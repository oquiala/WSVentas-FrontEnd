import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent {
  public lista: any[] = [];
  public columnas: string[] = ['idProducto', 'nombre', 'marca', 'categoria', 'precio', 'stock', 'activo', 'acciones'];

  constructor( private _prodService: ProductoService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.getProductos()
  }

  getProductos(){
    this._prodService.getProductos().subscribe(response => {
      this.lista = response.data
    })
  }

  addProducto(){
  }

  editProducto(prod:Producto){

  }

  delete(prod: Producto){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._prodService.delProducto(prod.idProducto).subscribe(response => {
          if (response.exito == 1) {
            this.snackBar.open('El producto fue eliminado con éxito', 'Listo!', {
              duration: 2000
            })
            this.getProductos()
          }
        })
      }
    })

  }



}
