import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { ConfiguracoesComponent } from '../pages/configuracoes/configuracoes.component';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'cardapio',
        loadComponent: () =>
          import('../pages/cardapio/cardapio.component').then((m) => m.CardapioComponent),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/tabs/cardapio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/cardapio',
    pathMatch: 'full',
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
  },
];
