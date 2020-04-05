import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        err => {
          this.setState({ error: err });
        }
      );
    }

    state = {
      error: null
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
      this.props.history.push({ pathname: '/' });
    };

    render() {
      return (
        <React.Fragment>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
