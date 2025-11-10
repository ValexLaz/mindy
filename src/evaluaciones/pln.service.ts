import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface PlnResult {
  label: '1 star' | '2 stars' | '3 stars' | '4 stars' | '5 stars';
  score: number;
}

@Injectable()
export class PlnService {
  private readonly plnApiUrl = 'http://127.0.0.1:5001/analizar';

  constructor(private readonly httpService: HttpService) {}

  async analizarSentimiento(texto: string): Promise<PlnResult | null> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<PlnResult>(this.plnApiUrl, { texto }),
      );
      return response.data;
    } catch (error) {
      console.error(
        'Error al contactar el microservicio de PLN:',
        error.message,
      );
      return null;
    }
  }
}