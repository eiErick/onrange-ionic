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
        path: 'tarefas',
        loadComponent: () =>
          import('../pages/tarefas/tarefas.component').then((m) => m.TarefasComponent),
      },
      {
        path: 'notas',
        loadComponent: () =>
          import('../pages/notas/notas.component').then((m) => m.NotasComponent),
      },
      {
        path: '',
        redirectTo: '/tabs/cardapio',
        pathMatch: 'full',
      },
      {
        path: 'tarefas',
        redirectTo: '/tabs/tarefas',
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
  {
    path: 'tarefas',
    redirectTo: '/tabs/tarefas',
    pathMatch: 'full',
  },
  {
    path: 'notas',
    redirectTo: '/tabs/notas',
    pathMatch: 'full',
  },
];
