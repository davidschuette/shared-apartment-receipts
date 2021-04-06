import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  CreateReceiptDto,
  MonthlyDeductionDto,
  ReceiptDto,
  ReceiptOverviewDto,
  UpdateReceiptDto,
} from '@nairobi/api-interfaces'
import { Observable, throwError } from 'rxjs'

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

  findOverviewData(
    year?: string,
    month?: string,
  ): Observable<ReceiptOverviewDto> {
    return this.http.get<ReceiptOverviewDto>(`/api/receipts/overview`, {
      params: new HttpParams({
        fromObject: {
          ...(year !== undefined ? { year } : {}),
          ...(month !== undefined ? { month } : {}),
        },
      }),
    })
  }

  findMonthlyDeduction(
    year: number,
    month: number,
  ): Observable<MonthlyDeductionDto> {
    return this.http.get<MonthlyDeductionDto>(
      `/api/receipts/${year}/month/${month}`,
    )
  }

  findOne(receiptId: string): Observable<ReceiptDto> {
    return this.http.get<ReceiptDto>(`/api/receipts/one/${receiptId}`)
  }

  update(receiptId: string, data: UpdateReceiptDto): Observable<ReceiptDto> {
    data.amount = parseFloat(data.amount + '')
    return this.http.put<ReceiptDto>(`/api/receipts/one/${receiptId}`, data)
  }

  delete(receiptId: string): Observable<void> {
    return this.http.delete<void>(`/api/receipts/one/${receiptId}`)
  }
}
