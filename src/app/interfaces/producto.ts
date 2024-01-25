export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  idMarca: number;
  marca: string;
  idCategoria: number;
  categoria: string;
  precio: number;
  stock: number;
  rutaImagen: string;
  nombreImagen: string;
  activo: boolean;
}
