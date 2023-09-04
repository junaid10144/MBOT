import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        // data: { title: 'MBOT - Signup' }
    },
    // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
