import utils from './utils';

describe('Utils suite', () => {
  it('should return a random number bewteen the min and max', () => {
    const num = utils.getRandom(1, 5);
    expect(num >= 1 && num <= 5).toBeTruthy();
  });
});
