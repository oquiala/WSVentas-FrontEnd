
import { Component } from '@angular/core';
import { AddmarcaComponent } from './addmarca/addmarca.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcaService } from 'src/app/services/marca.service';
import { Marca } from 'src/app/interfaces/marca';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss']
})
export class MarcaComponent {

  public lista: any[] = [];
  public columnas: string[] = ['id', 'descripcion', 'activo', 'actions'];

  constructor( private _marcaService: MarcaService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.getMarcas()
  }

  getMarcas(){
    this._marcaService.getMarcas().subscribe(response => {
      this.lista = response.data
    })
  }

  addMarca(){
    const dialogRef = this.dialog.open(AddmarcaComponent, {
      width: '500',
      height: '800'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getMarcas()
    })
  }

  editMarca(marca:Marca){
    const dialogRef = this.dialog.open(AddmarcaComponent, {
      width: '500', data: marca
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getMarcas()
    })

  }

  delete(marca: Marca){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._marcaService.delMarca(marca.idMarca).subscribe(response => {
          if (response.exito == 1) {
            this.snackBar.open('La marca fue eliminada con éxito', 'Listo!', {
              duration: 2000
            })
            this.getMarcas()
          }
        })
      }
    })

  }


}
