import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';

import { AccessControlGuard } from './shared/guards/accesscontrol.service';


export const ROUTES: Routes = [
    {path: 'UniM/dist2', redirectTo: 'login', pathMatch: 'full'},
    {path: 'messages', component: MessagesComponent, canActivate: [AccessControlGuard]},
    {path: 'login', component: LoginComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);