import React from 'react';
import { shallow } from 'enzyme';
import { AppTesting, mapStateToProps } from './App';
import { Article } from './../../components';

const articlesMock = [{
  id: 'XXX0040',
  name: 'React vs Reason',
  author: 'Jordan Walke',
},
{
  id: 'XXXX0404',
  name: 'Redux, maybe you don\'t need it',
  author: 'Dan Abramov',
},
];

const dispatch = jest.fn();

describe('App suite', () => {
  it('renders App without any state injected', () => {
    const wrapper = shallow(<AppTesting dispatch={dispatch} />);

    expect(wrapper).toBeDefined();
    expect(wrapper.find('.no-results').children().text()).toBe('Nothing to see here');
  });

  it('renders App with state injected', () => {
    const wrapper = shallow(<AppTesting dispatch={dispatch} articles={articlesMock} />);
    const articles = wrapper.find(Article);

    expect(wrapper).toBeDefined();
    expect(articles).toBeDefined();
  });

  it('should test mapStateToProps', () => {
    const mock = {
      article: {
        articles: articlesMock,
      },
    };
    expect(mapStateToProps(mock)).toEqual({
      articles: articlesMock,
    });
  });

  it('should test onRemove callback', () => {
    const onRemove = jest.fn();
    const comp = <AppTesting dispatch={dispatch} articles={articlesMock} onRemove={onRemove} />;
    const wrapper = shallow(comp);
    wrapper.instance().onRemove();
    expect(wrapper).toBeDefined();
    expect(dispatch).toHaveBeenCalled();
  });
});

