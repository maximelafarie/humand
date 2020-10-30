import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { UserListComponent } from './user-list.component';
import { UserApiService } from '@app/api';
import { DatatableParamsService, DictionaryService } from '@app/services';
import { GlobalMethodsService } from '@app/helpers';
import { ApiModule, PipesModule } from '@app/modules';
import { InputErrorModule } from '@app/components/common';

import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    InputErrorModule,
    PipesModule,
    ApiModule,

    NgxDatatableModule,
    NgSelectModule,
    NgxSmartModalModule.forChild()
  ],
  providers: [
    DatatableParamsService,
    UserApiService,
    GlobalMethodsService,
    DictionaryService,
    NgxSmartModalService
  ],
  exports: [UserListComponent]
})
export class UserListModule { }
