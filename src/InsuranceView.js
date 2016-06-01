import React from 'react';

const format = (num) => num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Item = (data) => 
    <tr>
    <td>{data.props.name}</td>
    <td>{data.props.id_str}</td>
    <td>{format(data.props.cost)}</td>
    <td>{format(data.props.payout)}</td>
    <td>{format(data.props.payout-data.props.cost)}</td>
    </tr>;


const InsuranceView = (data) => {
    console.log(data.props)
    return <table>
    <tbody>
    <tr>
    <td>name</td>
    <td>id</td>
    <td>cost</td>
    <td>payout</td>
    <td>margin</td>
    </tr>
    {data.props.map(item => <Item props={item} key={item.id_str}/>)}
    </tbody>
    </table>;
}


export default InsuranceView;