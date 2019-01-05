import React, {Component} from 'react';
import Order from './Order/Order';

import axios from '../../axios.orders';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    deleteOrderHandler = (key) => {
        // delete request with id
        console.log(key);
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/orders.json')
            .then(res => {
                let orders = null;
                orders = Object.keys(res.data).map(key => (
                    <Order {...res.data[key]} key={key} deleteOrder={ this.deleteOrderHandler} />
                ));
                this.setState({orders: orders, loading: false});
            });
    }

    render() {

        return (
            <div>
                {this.state.orders}
            </div>
        );
    }
}

export default Orders;