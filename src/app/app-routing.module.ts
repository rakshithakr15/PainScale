import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {
  //   path: 'recipes',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesPageModule)
  //     },
  //     {
  //       path: ':recipeId',
  //       loadChildren:
  //         './recipes/recipe-detail/recipe-detail.module#RecipeDetailPageModule'
  //     }
  //   ]
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then( m => m.LogsPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./records/records.module').then( m => m.RecordsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
