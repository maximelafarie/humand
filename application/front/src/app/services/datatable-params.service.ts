import { Injectable } from '@angular/core';

import { Subject, Observable } from 'rxjs';

@Injectable()
export class DatatableParamsService {
  public name: string;
  public params = {
    page: 1,
    offset: 0,
    limit: 10,
    count: 0,
    sort: {
      key: '',
      order: '',
    },
  };
  public paramChange = new Subject<any>();

  constructor() {
  }

  create(name, params = {}) {
    const obj = new DatatableParamsService();
    obj.name = name;

    obj.params = { ...obj.params, ...params };

    return obj;
  }

  getOffset() {
    return this.params.offset;
  }

  setCount(data) {
    this.params.count = parseInt(data, 10);
  }

  getCount() {
    return this.params.count;
  }

  setPage(data, emitEvent = true) {
    this.params.page = parseInt(data, 10);

    this.update(emitEvent);
  }

  getPage() {
    return this.params.page;
  }

  setLimit(data, emitEvent = true) {
    this.params.limit = parseInt(data, 10);
    this.params.page = 1;

    this.update(emitEvent);
  }

  getLimit() {
    return this.params.limit;
  }

  setOrder(key, order = 'asc', emitEvent = true) {
    this.params.sort = {
      key,
      order,
    };

    this.update(emitEvent);
  }

  getOrder() {
    return this.params.sort;
  }

  getOrderDatatable() {
    const sort = this.params.sort;

    return { prop: sort.key, dir: sort.order.toLocaleLowerCase() };
  }

  update(emitEvent = true) {
    this.params.limit = +this.params.limit;

    this.params.offset = (this.params.page - 1) * this.params.limit;

    if (emitEvent) {
      this.paramChange.next(this.params);
    }
  }

  onParamChange(): Observable<any> {
    return this.paramChange;
  }

  getParams() {
    const params: any = {};

    if (this.params.limit !== -1) {
      params.offset = this.params.offset.toString();
      params.limit = this.params.limit.toString();
    }

    params.page = this.params.page.toString();

    if (this.params.sort.key) {
      params[`order[${this.params.sort.key}]`] = this.params.sort.order;
    }

    return params;
  }

  noopComparator(): number {
    return 0;
  }

  paginationMaxLimit(): number {
    return (
      this.params.offset + this.params.limit > this.params.count ?
        this.params.count :
        this.params.offset + this.params.limit
    );
  }
}
