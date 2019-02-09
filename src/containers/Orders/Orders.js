import React, {Component} from 'react';
import Order from './Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios.orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../components/store/actions/index';

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
        this.props.onFetchOrders();
    }

    render() {

        let orders = this.props.loading ? <Spinner /> : this.props.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ));



        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));