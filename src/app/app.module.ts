import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {provideState, provideStore} from "@ngrx/store";
import {postReducer} from "./state/post/post.reducer";
import {authReducer} from "./state/auth/auth.reducer";
import {NgOptimizedImage} from "@angular/common";
import {otherReducer} from "./state/other/other.reducer";
import {ChatComponent} from "./components/chat/chat.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
      ChatComponent,
    NotFoundComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgOptimizedImage,
        // StoreModule.forRoot({ postSlice: postReducer })
    ],
  providers: [
    provideStore(),
    provideState({name:"post",reducer:postReducer}),
    provideState({name:"auth",reducer:authReducer}),
    provideState({name:"other",reducer:otherReducer}),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
