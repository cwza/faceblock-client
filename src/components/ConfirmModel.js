import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  onConfirm = () => {
    this.props.onConfirm();
    this.toggle();
  }
  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            <Button color="primary" onClick={this.onConfirm}>{this.props.confirmText}</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

ConfirmModel.propTypes = {
  onConfirm: React.PropTypes.func,
  body: React.PropTypes.string,
  conirmText: React.PropTypes.string,
  title: React.PropTypes.string,
  buttonLabel: React.PropTypes.string,
}

export default ConfirmModel;
