import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marca } from 'src/app/interfaces/marca';
import { MarcaService } from 'src/app/services/marca.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-addmarca',
  templateUrl: './addmarca.component.html',
  styleUrls: ['./addmarca.component.scss']
})
export class AddmarcaComponent {

  public form = this.formBuilder.group({
    descripcion: ['', Validators.required],
    activo: [true, Validators.required]
  })

  constructor(
    public dialogRef: MatDialogRef<AddmarcaComponent>,
    private _marcaService: MarcaService,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public marca: Marca)
  {
    if (this.marca !== null) {
      this.form.setValue({
        descripcion: marca.descripcion,
        activo: marca.activo
      })
    }
  }

  close(){
    this.dialogRef.close()
  }

  saveMarca(){
    const omarca: Marca = {
      idMarca: 0,
      descripcion: this.form.value.descripcion!,
      activo: this.form.value.activo!
    }

    if(this.marca !== null){
      omarca.idMarca = this.marca.idMarca
      this.editMarca(omarca)
    } else {
      this.addMarca(omarca)
    }
  }

  addMarca(marca: Marca){
    this._marcaService.addMarca(marca).subscribe(response => {
      if(response.exito == 1){
        this.dialogRef.close();
        this.snackBar.open("La marca fue adicionada con éxito", 'Listo', {duration: 2000})
      }
    })
  }

  editMarca(marca: Marca){
    this._marcaService.editMarca(marca).subscribe(response => {
      if(response.exito == 1){
        this.dialogRef.close();
        this.snackBar.open("La marca fue editada con éxito", 'Listo', {duration: 2000})
      }
    })
  }




}
