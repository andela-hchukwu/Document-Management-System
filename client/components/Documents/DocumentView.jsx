import React from 'react';
import PropTypes from 'prop-types';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import { connect } from 'react-redux';


/**
 *
 * @class DocumentForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: props.doc || {},
    };
  }

  /**
   *
   * @returns
   *
   * @memberOf DocumentForm
   */
  render() {
    const { doc } = this.state;
    const { title = '' } = doc;

    const form = (
      <FroalaEditorView model={this.props.content} />
    );
    return (
      <div>
        <h5>Title: {title}</h5>
        {form}
      </div>
    );
  }
}

DocumentForm.propTypes = {
  authentication: PropTypes.object,
  doc: PropTypes.object,
};

export default connect(null)(DocumentForm);
