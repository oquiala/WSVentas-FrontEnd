import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  public lista: any[] = [];
  public columnas: string[] = ['id', 'descripcion', 'activo', 'actions'];

  constructor( private _categoriaService: CategoriaService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.getCategorias()
  }

  getCategorias(){
    this._categoriaService.getCategorias().subscribe(response => {
      this.lista = response.data
    })
  }

  addCategoria(){
  }

  editCategoria(categoria:Categoria){
  }

  delete(categoria: Categoria){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._categoriaService.delCategoria(categoria.idCategoria).subscribe(response => {
          if (response.exito == 1) {
            this.snackBar.open('La categoría fue eliminada con éxito', 'Listo!', {
              duration: 2000
            })
            this.getCategorias()
          }
        })
      }
    })
  }

}
