import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActionButton from '../../components/UI/ActionButton/ActionButton';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import './AddProduct.css';

class AddProduct extends Component {
  // inputAttributes = {
  //   productName: {}
  // }

  state = {
    addProductForm: {
      // productName:{value, valid, isTouched},
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Product Name'
        },
        value: '',
        validation: {
          required: true,
          isAlphabetic: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      price: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Product Price'
        },
        value: '',
        validation: {
          required: true,
          isNumeric: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      description: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Product Descreption'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 20
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    },
    formIsValid: false,
    loading: false
  };

  addProductHandler = async event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.addProductForm) {
      formData[formElementIdentifier] = this.state.addProductForm[formElementIdentifier].value;
    }
    const addProduct = {
      addProductData: formData
    };
    this.props.onAddPropduct(addProduct);
    console.log(this.props.prodd, ' products in add kick this late');
    this.props.history.push('/');
  };

  checkValidity(value, rules, inputIdentifier) {
    let isValid = true;
    let error = '';
    if (!rules) {
      return true;
    }

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
      error = 'Field is required';
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
      error = `Field's min length is ${rules.minLength}`;
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
      error = `Field's max length is ${rules.maxLength}`;
    }

    if (rules.isNumeric && isValid) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value);
      error = 'Field is numeric';
    }

    if (rules.isAlphabetic && isValid) {
      const pattern = /^[A-Za-z]+$/;
      isValid = pattern.test(value);
      error = 'Field is alphabetic';
    }

    return { isValid, error };
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAddProductForm = {
      ...this.state.addProductForm
    };

    const updatedFormElement = {
      ...updatedAddProductForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    const { isValid, error } = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      inputIdentifier
    );

    updatedFormElement.valid = isValid;
    updatedFormElement.errorMessage = error;

    updatedFormElement.touched = true;
    updatedAddProductForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedAddProductForm) {
      formIsValid = updatedAddProductForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ addProductForm: updatedAddProductForm, formIsValid: formIsValid });
  };

  render() {
    let form = this.props.error ? <p>Failed to post products</p> : <Spinner />;
    if (this.props.loading) {
      form = <Spinner />;
    }
    if (!this.props.loading) {
      const formElementArray = [];
      for (let key in this.state.addProductForm) {
        formElementArray.push({ id: key, config: this.state.addProductForm[key] });
      }
      form = (
        <form onSubmit={this.addProductHandler}>
          {formElementArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={event => this.inputChangedHandler(event, formElement.id)}
              errorMessage={formElement.config.errorMessage}
            />
          ))}
          <div style={{ padding: '10px' }}>
            <ActionButton disabled={!this.state.formIsValid} clicked={this.addProductHandler}>
              Add Product
            </ActionButton>
          </div>
        </form>
      );
    }
    return <div className="AddProduct">{form}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.prods.loading,
    error: state.prods.error,
    prodd: state.prods.products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPropduct: addProductForm => dispatch(actions.createProduct(addProductForm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
