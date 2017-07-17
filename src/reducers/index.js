import { combineReducers } from 'redux';
import { article } from './article';
import type { State as ArticleState } from './article';

export type State = {
  article: ArticleState
};

const rootReducer = combineReducers({
  article,
});

export default rootReducer;
