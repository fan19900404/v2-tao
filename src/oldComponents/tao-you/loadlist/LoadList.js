import Vue from 'vue';

class LoadData {
  constructor(url, param = {}, method = 'GET') {
    this.url = url;
    this.loading = false;
    this.allLoaded = false;
    this.inited = false;
    this.list = [];
    this.page = 1;
    this.limit = param.limit || 10;
    this.param = param;
    this.method = method;
    this.noData = false;
  }

  getList(that, callback) {
    if (this.loading || this.allLoaded) {
      return;
    }
    this.loading = true;
    const param = Object.assign(
      this.param,
      {
        page: this.page,
        limit: this.limit,
      },
      this.param,
    );
    Vue.ClientHttp(that)[this.method](param, this.url).then((res) => {
      this.inited = true;
      if (res.code === 10000) {
        const result = res.result || res.list;
        this.list = this.list.concat(result);
        const length = result.length;
        if (length > 0) {
          this.page += 1;
        }
        if (length < this.limit) {
          this.allLoaded = true;
        }
        if (typeof callback === 'function') callback.apply(that, [res]);
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }
}

export default LoadData;
