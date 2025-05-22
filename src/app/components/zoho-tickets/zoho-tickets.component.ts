import { Component, OnInit } from '@angular/core';
import {
  Ticket,
  ZohoTicketsService,
  TicketCreateDto
} from './zoho-tickets.service';

@Component({
  selector: 'app-zoho-tickets',
  templateUrl: './zoho-tickets.component.html',
  standalone: false
})
export class ZohoTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  // поля для формы создания тикета
  newTicket: TicketCreateDto = {
    subject: '',
    departmentId: '',
    contactId: '',
    description: ''
  };
  loading = false;
  errorMsg = '';

  constructor(private zohoTicketsService: ZohoTicketsService) {}

  async ngOnInit() {
    // при старте пытаемся загрузить тикеты
    await this.loadTickets();
  }

  /** Перенаправить на Zoho OAuth-флоу */
  signIn(): void {
    this.zohoTicketsService.signIn();
  }

  /** Загрузить и обновить список тикетов */
  private async loadTickets() {
    this.loading = true;
    this.errorMsg = '';
    try {
      this.tickets = await this.zohoTicketsService.getAll();

      console.log(this.tickets);
    } catch (err) {
      console.error('Ошибка при загрузке тикетов', err);
      this.errorMsg = 'Не удалось получить тикеты. Проверьте консоль.';
    } finally {
      this.loading = false;
    }
  }

  /** Создать новый тикет и обновить список */
  async createTicket() {
    if (!this.newTicket.subject.trim()) {
      this.errorMsg = 'Тема не может быть пустой';
      return;
    }

    this.loading = true;
    this.errorMsg = '';
    try {
      await this.zohoTicketsService.create(this.newTicket);
      // очистим форму
      this.newTicket = {
        subject: '',
        departmentId: '',
        contactId: '',
        description: ''
      };
      // перезагрузим список
      await this.loadTickets();
    } catch (err) {
      console.error('Ошибка при создании тикета', err);
      this.errorMsg = 'Не удалось создать тикет. Проверьте консоль.';
    } finally {
      this.loading = false;
    }
  }
}
