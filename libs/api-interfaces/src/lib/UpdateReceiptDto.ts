import {
  IsString,
  IsNumber,
  IsDateString,
  IsUUID,
  IsArray,
  IsBoolean,
} from 'class-validator'

export class UpdateReceiptDto {
  @IsString()
  shop: string

  @IsNumber()
  amount: number

  @IsDateString()
  date: string

  @IsString()
  @IsUUID(4)
  payer: string

  @IsString({ each: true })
  @IsUUID(4, { each: true })
  @IsArray()
  affected: string[]

  @IsBoolean()
  monthly: boolean
}
