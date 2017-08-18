import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import applyClasses from 'apply-classes';
import utils from './../../utils';
import './Article.css';

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.generateClasses = this.generateClasses.bind(this);
    this.openActions = this.openActions.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.visible && nextState.visible) {
      utils.addEventsToDocument(this.getDocumentEvents());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.visible && !this.state.visible) {
      utils.removeEventsFromDocument(this.getDocumentEvents());
    }
  }

  componentWillUnmount() {
    if (this.state.visible) {
      utils.removeEventsFromDocument(this.getDocumentEvents());
    }
  }

  getDocumentEvents() {
    return {
      click: this.handleDocumentClick,
      touchend: this.handleDocumentClick,
    };
  }

  handleDocumentClick(event) {
    if (
      this.state.visible &&
      !utils.targetIsDescendant(event, ReactDOM.findDOMNode(this))
    ) {
      this.setState({ visible: false });
    }
  }

  openActions() {
    this.setState({
      visible: true,
    });
  }

  remove(event, data) {
    this.props.onRemove(data);
  }

  generateClasses() {
    const articleClasses = applyClasses({
      article: true,
      relative: this.state.visible,
    });
    const editClass = applyClasses({
      action: true,
      'edit-action': true,
      visible: this.state.visible,
    });
    const deleteClass = applyClasses({
      action: true,
      'delete-action': true,
      visible: this.state.visible,
    });
    return {
      article: articleClasses,
      edit: editClass,
      delete: deleteClass,
    };
  }

  render() {
    const { data } = this.props;
    const link = `detail/${data.id}`;
    const classes = this.generateClasses();
    return (
      <section className={classes.article}>
        <Link to={link} className="title">
          {data.title}
        </Link>
        <h3 className="author">
          {data.author}
        </h3>
        <p className="flex-1 excerpt">
          {data.excerpt}
        </p>
        <div className="flex flex-end">
          <button onClick={this.openActions}>ACTIONS</button>
        </div>
        <div className={classes.edit} onClick={() => this.props.onEdit(data)}>
          <h3>Edit</h3>
        </div>
        <div
          className={classes.delete}
          onClick={event => this.remove(event, data)}
        >
          <h3>Delete</h3>
        </div>
      </section>
    );
  }
}

const ArticlePropTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
};

Article.propTypes = {
  data: PropTypes.shape(ArticlePropTypes).isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Article;
