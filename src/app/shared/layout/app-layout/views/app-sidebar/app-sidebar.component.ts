import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    PanelMenuModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss'
})
export class AppSidebarComponent {
    isVisible = input<boolean>(false);
    @Output() toggleSidebar = new EventEmitter<void>();

    onToggleSidebar() {
        this.toggleSidebar.emit();
    }
}
