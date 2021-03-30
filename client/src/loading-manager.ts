
// LoadingManager seems to be broken when you attempt to load multiple
// resources multiple times, only first onLoad is called.
// So roll our own.
class OurLoadingManager {
  loader_: any;
  files_: Set<unknown>;
  onLoad: () => void;
  constructor(loader) {
    this.loader_ = loader;
    this.files_ = new Set();
    this.onLoad = () => { };
  }

  load(file, cb) {
    this.files_.add(file);

    this.loader_.load(file, (result) => {
      this.files_.delete(file);
      cb(result);

      if (this.files_.size == 0) {
        this.onLoad();
      }
    });
  }
};

export {
  OurLoadingManager
}