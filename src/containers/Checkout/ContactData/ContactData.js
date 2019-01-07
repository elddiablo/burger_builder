import React, {Component} from 'react';
import axios from '../../../axios.orders';

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
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            },
        },
        loading: false,
        purchasing: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                
            },
            deliveryMetyhod: 'Fastest'
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        } 

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});

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
            <form>

                {formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}  
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;