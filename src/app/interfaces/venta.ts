import { DetalleVenta } from './detalle-venta';

export interface Venta {
  idVenta: number
  idUsuario: number
  contacto: string
  telefono: string
  direccion: string
  idDistrito: string
  detalleVenta: DetalleVenta[]
}
