import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { AppTopbarComponent } from '../app-topbar/app-topbar.component';
import { AppSidebarComponent } from '../app-sidebar/app-sidebar.component';
import { AppFooterComponent } from '../app-footer/app-footer.component';

import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    AppTopbarComponent,
    AppSidebarComponent,
    AppFooterComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export default class AppLayoutComponent {
    private authService = inject(AuthService);

    sidebarVisible = signal<boolean>(false);
    sidebarHidden = signal<boolean>(false);
    isMobile = window.innerWidth < 1024;

    constructor() {
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth < 1024;
            if (!this.isMobile) {
                this.sidebarVisible.set(false);
            }
        });
    }

    toggleSidebar() {
        if (this.isMobile) {
            this.sidebarVisible.update(visible => !visible);
        } else {
            this.sidebarHidden.update(hidden => !hidden);
        }
    }

    closeSidebar() {
        this.sidebarVisible.set(false);
    }
}
