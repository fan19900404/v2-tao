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

  changeParam(param) {
    this.param = param;
  }

  changePageIndex() {
    this.page = 1;
    this.allLoaded = false;
    this.list = [];
  }

  getList(that, callback) {
    console.log(this.loading, this.allLoaded);
    if (this.loading || this.allLoaded) {
      return;
    }
    this.loading = true;
    let param = Object.assign(this.param, {
      page: this.page,
      limit: this.limit
    }, this.param);
    Vue.ClientHttp(that)[this.method](param, this.url)
      .then((res) => {
        this.inited = true;
        if (res.code === 10000) {
          this.list = this.list.concat(res.result);
          let length = res.result.length;
          if (length > 0) {
            this.page++;
          }
          if (length < this.limit) {
            this.allLoaded = true;
          }
          if (typeof callback === 'function') callback.apply(that, [res]);
          setTimeout(() => {
            this.loading = false;
          }, 1000);
          if(0 === this.list.length) {
            this.noData = true;
          }
        }
      });
  }
}

export default LoadData;
