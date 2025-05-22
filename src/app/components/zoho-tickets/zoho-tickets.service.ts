import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import axios, { AxiosResponse } from 'axios';

export interface Ticket {
  id: string;
  subject: string;
  status: string;
  createdTime: string;
}

export interface TicketCreateDto {
  subject: string;
  departmentId: string;
  contactId: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ZohoTicketsService {
  private base = `${environment.baseUrl}api/ZohoTickets`;

  /** Запустить OAuth-флоу: перенаправит браузер на Zoho-авторизацию */
  signIn(): void {
    const clientId = '1000.DQLD1CARJCA7FZOVM2SY6NOK6IOAJE';
    const redirectUri = encodeURIComponent(
      'http://localhost:8080/api/ZohoTickets/signin-zoho'
    );
    const scope = encodeURIComponent('Desk.tickets.CREATE,Desk.tickets.READ');
    const state = Math.random().toString(36).substring(2); // или более надёжный генератор
    const authUrl =
      `https://accounts.zoho.com/oauth/v2/auth` +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&scope=${scope}` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}`;
    window.location.href = authUrl;
  }

  /** Получить список тикетов */
  async getAll(): Promise<Ticket[]> {
    const resp: AxiosResponse<Ticket[]> = await axios.get(this.base);
    return resp.data;
  }

  /** Создать новый тикет */
  async create(dto: TicketCreateDto): Promise<Ticket> {
    const resp: AxiosResponse<Ticket> = await axios.post(this.base, dto);
    return resp.data;
  }
}
