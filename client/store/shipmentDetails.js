import axios from 'axios'
import history from '../history';

const ADD_SHIPMENT_DETAILS = 'ADD_SHIPMENT_DETAILS'

const defaultShipmentDetails = {}

export const addShipmentDetails = shipmentDetails => ({ type: ADD_SHIPMENT_DETAILS, shipmentDetails })


export const addNewShipmentDetailsThunk = (orderDetails) => dispatch => {
    axios.post('/api/shipment-details', orderDetails)
        .then(res => {
            dispatch(addShipmentDetails(res.data))
            history.push('/order-placed')

        })
        .catch(err => console.log(err))
}

export default function (state = defaultShipmentDetails, action) {
    switch (action.type) {
        case ADD_SHIPMENT_DETAILS:
            return [...state, action.shipmentDetails]

        default:
            return state
    }
}
