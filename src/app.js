import ReactDOM from 'react-dom';
import React from 'react';
import {Table} from 'Reactable';
import _ from 'lodash';
import "./app.css";
import {getOfflineData, setOfflineData} from "./offline";

const format = (num) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const iconURL = "https://image.eveonline.com/Type/";
const getImageUrl = (typeID) => `${iconURL}${typeID}_32.png`;

const fetchData = () => { console.log("fetching data"); let data; return fetch("https://crest-tq.eveonline.com/insuranceprices/", {
        headers: {"Accept-Language": "EN-en"}})
    .then(response => response.json())
    .then((result) => data = result)
    .then((result) => setOfflineData(result, 1000*60*60))
    .then(() => data)
};

const formatData = ({items}) => { return _(items).map(({type, insurance}) => {
        return {
            "": <img src={getImageUrl(type.id_str)}/>,
            Name:type.name,
            Payout: format(_.last(insurance).payout),
            Cost: format(_.last(insurance).cost),
            Margin: format(_.last(insurance).payout - _.last(insurance).cost)
        };
    })
    .sortBy('Name').value();
};

Promise.resolve()
.then(getOfflineData)
.then((offlineData) => offlineData || fetchData())
.then(formatData)
.then(formatedItemList => {
    ReactDOM.render(<Table  data={formatedItemList} filterable={['Name']} itemsPerPage={20}/>, document.getElementById('app'));
});
