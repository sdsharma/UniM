import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';

import { AccessControlGuard } from './shared/guards/accesscontrol.service';


export const ROUTES: Routes = [
    {path: 'UniM/dist2', redirectTo: 'UniM/dist2/login', pathMatch: 'full'},
    {path: 'UniM/dist2/messages', component: MessagesComponent, canActivate: [AccessControlGuard]},
    {path: 'UniM/dist2/login', component: LoginComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);