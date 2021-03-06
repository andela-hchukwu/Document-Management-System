import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import classnames from 'classnames';
import 'froala-editor/js/froala_editor.pkgd.min';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import { addFlashMessage } from '../../actions/flashMessages';


/**
 *
 * @class DocumentForm
 * @extends {React.Component}
 */
class DocumentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      doc: props.doc || {},
      displaySaveButton: true
    };
    this.onChange = this.onChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.saveDocument = this.saveDocument.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  /**
   *
   * @memberOf DocumentForm
   */
  componentDidMount() {
    $('#accessDropdown').on('change', this.onChange);
  }

  /**
   *
   * @param {object} nextProps
   *
   * @memberOf DocumentForm
   */
  componentWillReceiveProps(nextProps) {
    const editable = nextProps.doc.OwnerId === this.props.authentication.user.userId
      || !nextProps.doc.id;
    if (!editable) {
      $('.fr-wrapper').froalaEditor('edit.off');
    }
    this.setState({
      doc: nextProps.doc,
      displaySaveButton: editable
    });
  }

  /**
   *
   * @param {array} event
   *
   * @memberOf DocumentForm
   */
  onChange(event) {
    const { name: field, value } = event.target;
    const OwnerId = this.props.authentication.user.userId;
    const role = String(this.props.authentication.user.userRoleId);
    this.setState((state) => {
      const doc = Object.assign({},
        state.doc, {
          [field]: value,
          OwnerId,
          role
        });
      return { doc };
    });
  }

  /**
   *
   * @param {object} model
   *
   * @memberOf DocumentForm
   */
  handleModelChange(model) {
    this.setState((state) => {
      const doc = Object.assign({},
        state.doc, { content: model });
      return { doc };
    });
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf DocumentForm
   */
  saveDocument(event) {
    event.preventDefault();
    this.props.actions.saveDocument(this.state.doc, this.props.authentication.user.userId)
      .then(() => {
        toastr.success('Document Successfully Saved');
        $('#docDisplayModal').modal('close');
      })
      .catch(() => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Cannot save Document'
        });
        toastr.error('Cannot save Document');
        $('#docDisplayModal').modal('close');
      });
  }

  /**
   *
   * @param {object} event
   *
   * @memberOf DocumentForm
   */
  updateDocument(event) {
    event.preventDefault();
    this.props.actions.updateDocument(this.state.doc, this.props.authentication.user.userId)
      .then(() => {
        toastr.success('Document Successfully Updated');
        $('#docDisplayModal').modal('close');
      })
      .catch(() => {
        this.props.addFlashMessage({
          type: 'error',
          text: 'Unable to update document'
        });
        toastr.error('Unable to update document');
        $('#docDisplayModal').modal('close');
      });
  }

  /**
   *
   * @memberOf DocumentForm
   */
  redirect() {
    toastr.success('Document Successfully Saved');
    this.context.router.push('/documents');
    $('#docDisplayModal').modal('close');
  }

  /**
   *
   * @returns
   *
   * @memberOf DocumentForm
   */
  render() {
    const { displaySaveButton, doc } = this.state;
    const { id, title = '', content = '', access } = doc;
    const form = (
      <form>
        <div className="row">
          {!displaySaveButton && 'View Only'}
          <div className="input-field col s12">
            <input
              icon="subject"
              id="title"
              type="text"
              value={title}
              name="title"
              placeholder="Enter a Title here!"
              className="validate"
              onChange={this.onChange} />
            <label id="labeltitle"
              htmlFor="title" className="active">Title
            </label>
          </div>

          <div className="input-field col s12">
            <FroalaEditor
              tag="textarea"
              model={content}
              onModelChange={this.handleModelChange} />
          </div>

          <br />

          <div className="input-field col s12">
            <select name="access" id="accessDropdown"
              value={access}
              className="browser-default" onChange={this.onChange}>
              <option value="" disabled >Document Visibility Access</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="role">Role</option>
            </select>
          </div>

          <div className={classnames('input-field col s12', {
            hide: displaySaveButton === false
          })}>
            <input
              icon="save"
              id="saveButton"
              type="submit"
              value="Save"
              className="btn waves-effect waves-light blue-grey"
              onClick={id ? this.updateDocument : event => this.saveDocument(event)} />
          </div>
        </div>
      </form>
    );
    return (
      <div>
        {form}
      </div>
    );
  }
}

DocumentForm.propTypes = {
  authentication: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  doc: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

/**
 * @param {any} dispatch
 * @returns {any}
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch),
    addFlashMessage: bindActionCreators(addFlashMessage, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(DocumentForm);
