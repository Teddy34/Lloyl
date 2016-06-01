import ReactDOM from 'react-dom';
import React from 'react';
import {Table} from 'Reactable';
import _ from 'lodash';

const format = (num) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

fetch("https://crest-tq.eveonline.com/insuranceprices/")
.then(response => response.json())
.then(response => response.items)
.then(itemList => _.map(itemList, ({type, insurance}) => {
    return {
        Name:type.name,
        Id: type.id_str,
        Payout: format(_.last(insurance).payout),
        Cost: format(_.last(insurance).cost),
        Margin: format(_.last(insurance).payout - _.last(insurance).cost)
    };
}))

.then(formatedItemList => {
    ReactDOM.render(<Table  data={formatedItemList} filterable={['Name']}/>, document.getElementById('app'));
})