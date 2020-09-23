import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component'
import { MainPageComponent } from './main-page/main-page.component'
import { CreateProductsPageComponent } from './create-products-page/create-products-page.component'
import { AuthPageComponent } from './auth-page/auth-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { AuthService } from './shared/services/auth.service'
import { TokenInterceptor } from './shared/classes/token.interceptor'
import { ShopMainLayoutComponent } from './shared/layouts/shop-main-layout/shop-main-layout.component'
import { UserOperationService } from './shared/services/user-operation.service'
import { CrudDataServerService } from './shared/services/crud-data-server.service'
import { MyProductsPageComponent } from './my-products-page/my-products-page.component'
import { CategoryPageComponent } from './category-page/products-page.component'
import { ProductPageComponent } from './product-page/product-page.component'
import { OrderPageComponent } from './order-page/order-page.component'
import { OrderService } from './shared/services/order.service'
import { ProfilePageComponent } from './profile-page/profile-page.component'
import { HistoryOrdersPageComponent } from './history-orders-page/history-orders-page.component'
import { FavoritePageComponent } from './favorite-page/favorite-page.component'
import { SearchPipe } from './shared/Pipes/search.pipe'
import { SearchPipeByCategory } from './shared/Pipes/searchByCategory.pipe'
import { CommentPageComponent } from './product-page/comment-page/comment-page.component'
import { ShowCommentPageComponent } from './product-page/show-comment-page/show-comment-page.component'
import { LoadingPageComponent } from './shared/pages/loading-page/loading-page.component'
import { ChatPageComponent } from './shared/pages/chat-page/chat-page.component'
import { SocketService } from './shared/services/socket.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainPageComponent,
    CreateProductsPageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    ShopMainLayoutComponent,
    MyProductsPageComponent,
    CategoryPageComponent,
    ProductPageComponent,
    OrderPageComponent,
    ProfilePageComponent,
    HistoryOrdersPageComponent,
    FavoritePageComponent,

    SearchPipe,
    SearchPipeByCategory,
    CommentPageComponent,
    ShowCommentPageComponent,
    LoadingPageComponent,
    ChatPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [UserOperationService, AuthService, CrudDataServerService, OrderService, SocketService, {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {




}





