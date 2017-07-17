/* eslint-disable */
// @flow
export type Article = {
  author?: string,
  content?: string,
  excerpt?: string,
  id?: string,
  published?: boolean,
  tags?: string[],
  title?: string
};

declare module 'react-fontawesome' {
  declare export class FontAwesome extends React$Component {
    props: {
      name?: string,
      size?: string,
    }
  }
}
