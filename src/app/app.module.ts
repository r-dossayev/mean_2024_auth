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
import { GraphQLModule } from './graphql.module';
import {APOLLO_OPTIONS} from "apollo-angular";
import {HttpLink} from "apollo-angular/http";
import {InMemoryCache} from "@apollo/client/core";

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
        GraphQLModule,
        // StoreModule.forRoot({ postSlice: postReducer })
    ],
  providers: [
    provideStore(),
    provideState({name:"post",reducer:postReducer}),
    provideState({name:"auth",reducer:authReducer}),
    provideState({name:"other",reducer:otherReducer}),
    // {
    //   provide: APOLLO_OPTIONS,
    //   useFactory(httpLink: HttpLink) {
    //     return {
    //       cache: new InMemoryCache(),
    //       link: httpLink.create({
    //         uri: 'http://localhost:8787/graphql',
    //       }),
    //     };
    //   },
    //   deps: [HttpLink],
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
