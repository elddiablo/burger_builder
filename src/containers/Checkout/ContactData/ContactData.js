import React, {Component} from 'react';
import axios from '../../../axios.orders';

import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
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
                name: 'Nikita Parovyi',
                address: {
                    street: 'Rostovskaya',
                    zipCode: '3009',
                    country: 'Ukraine'
                },
                email: 'test@test.com'
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

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Enter your Name" />
                <input className={classes.Input} type="email" name="email" placeholder="Enter your Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Enter your Street" />
                <input className={classes.Input} type="text" name="postalCode" placeholder="Enter your postalCode" />
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