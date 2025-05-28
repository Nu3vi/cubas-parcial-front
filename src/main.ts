import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeKeycloak } from './app/shared/config/keycloak.config';
async function startApp() {
  try {
    await initializeKeycloak();

    await bootstrapApplication(AppComponent, appConfig);

  } catch (error) {
    await bootstrapApplication(AppComponent, appConfig);
  }
}

startApp();
