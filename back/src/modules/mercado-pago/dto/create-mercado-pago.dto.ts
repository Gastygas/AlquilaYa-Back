import { IsNumber, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateMercadoPagoDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number; // Monto del pago

  @IsNotEmpty()
  @IsString()
  description: string; // Descripción del pago

  @IsNotEmpty()
  @IsString()
  externalReference: string; // Referencia externa (tu ID de la orden)

  @IsOptional()
  @IsString()
  paymentMethodId?: string; // ID del método de pago (si quieres especificar)

  @IsOptional()
  @IsNumber()
  installments?: number; // Número de cuotas

  @IsOptional()
  @IsString()
  payerEmail?: string; // Email del comprador (opcional si no se usa un checkout personalizado)

  // Puedes añadir más campos si tu aplicación los requiere,
  // por ejemplo, un campo para el ID del usuario
}
