import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BuilderModule } from './builder/builder.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { DefaultModule } from './default/default.module';
import { HttpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { UserService } from './shared/services/user.service';
import { TemplatesModule } from './templates/templates.module';

@NgModule({
  imports: [
    HttpModule, BrowserModule,
    DefaultModule, BuilderModule, TemplatesModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [UserService],
  bootstrap: [AppComponent],
  declarations: [AppComponent, ErrorComponent]
})
export class AppModule { }
