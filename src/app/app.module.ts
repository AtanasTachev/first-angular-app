import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserModule } from './user/user.module';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    UserModule,
    RecipesModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (authService: AuthService) => {
    //     return () => authService.authenticate();
    //   },
    //   deps: [AuthService],
    //   multi: true
    // }
  ],
  bootstrap: [
    AppComponent
]
})
export class AppModule { }