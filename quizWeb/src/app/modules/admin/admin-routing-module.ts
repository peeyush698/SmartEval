import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { AddQuestionInTest } from './components/add-question-in-test/add-question-in-test';
import { ViewTest } from './components/view-test/view-test';
import { ViewTestResults } from './components/view-test-results/view-test-results';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-test', component: CreateTestComponent },
  { path: 'add-question/:id', component: AddQuestionInTest},
  { path: 'view-test/:id', component: ViewTest},
  { path: 'view-test-results', component: ViewTestResults}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
