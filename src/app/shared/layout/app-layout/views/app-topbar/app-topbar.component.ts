
import { Component, EventEmitter, Output, inject, input, output, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-app-topbar',
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    AvatarModule,
    BadgeModule,
    InputTextModule
  ],
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent {
    authService = inject(AuthService);

    @Output() toggleSidebar = new EventEmitter<void>();

    sidebarHidden = input<boolean>(false);
    open = signal<boolean>(false);

    modoOscuro(): void {
        document.body.classList.toggle('my-app-dark');
    }

    goToProfile() {
        this.open.set(false);
    }

    goToSettings() {
        this.open.set(false);
    }

    async logout() {
        this.open.set(false);
        await this.authService.logout();
    }
    onToggleSidebar() {
        this.toggleSidebar.emit();
    }

    getInitials(): string {
        const username = this.authService.username();
        if (!username) return 'U';

        const names = username.split(' ');
        if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return username[0].toUpperCase();
    }
}
