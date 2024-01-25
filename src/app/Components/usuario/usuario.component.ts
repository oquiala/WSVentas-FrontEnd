import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  public lista: any[] = [];
  public columnas: string[] = ['id', 'usuario', 'nombre', 'apellidos', 'correo', 'activo', 'actions'];

  constructor( private _userService: UsuarioService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void{
    this.getUsers()
  }

  getUsers(){
    this._userService.getUsers().subscribe(response => {
      this.lista = response.data
    })
  }

  addUser(){
    /*const dialogRef = this.dialog.open(AddmarcaComponent, {
      width: '300'
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    })*/
  }

  editUser(user:Usuario){
    /*const dialogRef = this.dialog.open(AddmarcaComponent, {
      width: '300', data: user
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers()
    })*/

  }

  delete(user: Usuario){
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._userService.delUser(user.idUsuario).subscribe(response => {
          if (response.exito == 1) {
            this.snackBar.open('El usuario fue eliminado con éxito', 'Listo!', {
              duration: 2000
            })
            this.getUsers()
          }
        })
      }
    })

  }

}
