export const transferDataStore = {};
export const smuggledDataCache = {
  isSet: false,
  data: undefined,
  set(value) {
    this.data = value;
    this.isSet = true;
  },
  destroy() {
    this.isSet = false;
    this.data = undefined;
  },
};
