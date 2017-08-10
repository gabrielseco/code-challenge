import utils from './../utils';

const shared = {
  colors: ['#0C5444', '#2E3A5D', '#8D5B8E', '#929291'],
  getColor() {
    return this.colors[utils.getRandom(1, this.colors.length - 1)];
  },
};

export default shared;
