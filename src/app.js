import ReactDOM from 'react-dom';
import React from 'react';

import InsuranceView from './InsuranceView';
import _ from 'lodash';

fetch("https://crest-tq.eveonline.com/insuranceprices/")
.then(response => response.json())
.then(response => response.items)
.then(itemList => _.map(itemList, item => {
    return {
        name:item.type.name,
        id_str: item.type.id_str,
        payout: _.last(item.insurance).payout,
        cost: _.last(item.insurance).cost
    };
}))
.then(formatedItemList => {
    ReactDOM.render(<InsuranceView props={formatedItemList}/>, document.getElementById('app'));
})