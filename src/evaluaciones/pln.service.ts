import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface PlnResult {
  pred_label: 'negativo' | 'neutro' | 'positivo';
  probabilidades: {
    negativo: number;
    neutro: number;
    positivo: number;
  };
  texto: string;
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
      console.error('❌ Error al contactar el microservicio PLN:', error.message);
      return null;
    }
  }
}
