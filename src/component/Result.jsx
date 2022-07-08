import {ReactComponent as ExchangeArrows} from '../exchangeArrow.svg';

function Result(props) {

    return (
        <div className="App-result">
            <div className="App-column">
                <label>{props.from}</label>
                <p>{props.amout}</p>
            </div>
            <ExchangeArrows className="App-exchangeArrow" fill='white'/>
            <div className="App-column">
                <label>{props.to}</label>
                <span>{props.value}</span>
            </div>
        </div>
    )
}

export default Result;