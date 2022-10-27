import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './cmps/about/about.component';
import { ContactDetailsComponent } from './cmps/contact-details/contact-details.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { EditContactComponent } from './cmps/edit-contact/edit-contact.component';
import { SignupComponent } from './cmps/signup/signup.component';
import { SignupGuard } from './guards/signup.guard';
import { UserGuard } from './guards/user.guard';
import { ContactResolver } from './service/contact.resolver';
import { HomePageComponent } from './views/home-page/home-page.component';


const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [UserGuard]

    },
    {
        path: 'about',
        component: AboutComponent,

    },
    {
        path: '',
        component: SignupComponent,
        canActivate: [SignupGuard]

    },

    {
        path: 'contact', component: ContactListComponent,canActivate: [UserGuard],

        children: [
            {
                path: 'edit/:id', component: EditContactComponent,
                resolve: { contact: ContactResolver }
            },
            { path: 'edit', component: EditContactComponent }
        ]
    },
    { path: 'contact/:id', component: ContactDetailsComponent, resolve: { contact: ContactResolver } },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
