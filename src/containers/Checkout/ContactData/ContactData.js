import React, {Component} from 'react';
import axios from '../../../axios.orders';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {
                    required: true
                },
                valid: true
            },
        },
        formIsValid: false,
        loading: false,
        purchasing: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        const formData = {};

        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        }

        axios.post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({loading: false});
                this.props.history.push('/');
            }).catch(err => {
                console.log(err)
                this.setState({loading: false});
            });
    }

    checkValidity(value, rules) {
        let isValid = true;

                if (rules.required) {
                    isValid = value.trim() !== '' && isValid;
                }

                if(rules.minLength) {
                    isValid = value.length >= rules.minLength && isValid;
                }
        
                if(rules.maxLength) {
                    isValid = value.length <= rules.maxLength && isValid;
                }


        return isValid;

    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        } 

        // checking for valid values
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);

        // updating touched prop
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        // updating the overall validity
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

        console.log(updatedFormElement);

    }

    render() {
        const formElements = [];
        for (const key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                formElements.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
        }
        let form = (
            <form onSubmit={this.orderHandler}>

                {formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                        inputName={formElement.id}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner />;
        }


        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data:</h4>
                {form}
            </div>
        );
    }

}

const mapStateToIngredients = state => {

    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToIngredients)(ContactData);