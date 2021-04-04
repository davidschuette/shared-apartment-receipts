import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  CreateReceiptDto,
  MonthlyDeductionDto,
  ReceiptDto,
  ReceiptOverviewDto,
} from '@nairobi/api-interfaces'
import { Observable, of, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor(private readonly http: HttpClient) {}

  create(data: CreateReceiptDto): Observable<ReceiptDto> {
    return this.http.post<ReceiptDto>('/api/receipts', data)
  }

  findAll(): Observable<ReceiptDto[]> {
    return throwError(new Error())
  }

  findOverviewData(): Observable<ReceiptOverviewDto> {
    return this.http.get<ReceiptOverviewDto>('/api/receipts/overview')
  }

  findMonthlyDeduction(
    year: number,
    month: number,
  ): Observable<MonthlyDeductionDto> {
    return this.http.get<MonthlyDeductionDto>(
      `/api/receipts/${year}/month/${month}`,
    )
  }
}
