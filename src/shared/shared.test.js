import shared from './shared';
import utils from './../utils';

describe('Shared suite', () => {
  it('should get a color from the array', () => {
    const index = 0;
    const spy = jest.spyOn(utils, 'getRandom').mockImplementation(() => index);
    expect(shared.getColor()).toBe(shared.colors[index]);
    expect(spy).toHaveBeenCalled();
  });
});
