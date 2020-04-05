import React, { Component } from 'react';

// import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import ActionButton from '../../components/UI/ActionButton/ActionButton';
import './Auth.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        errorMessage: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        errorMessage: ''
      }
    }
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

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ).isValid,
        errorMessage: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ).error,
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({ id: key, config: this.state.controls[key] });
    }
    let form = (
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
            Submit
          </ActionButton>
        </div>
      </form>
    );
    return <div className="Auth">{form}</div>;
  }
}

export default Auth;
