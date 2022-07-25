import Result from "./Result";
import { useState, useEffect } from 'react';
import {ReactComponent as InvertArrow} from '../circle arrow.svg';


function AmountValue({value, onChange}) {

    return(
            <div className="App-column">
                <label>Amount</label>
                <input 
                    value={value}
                    type="number" 
                    min="1.00"
                    step="0.001"
                    onChange={onChange}
                ></input>
            </div>
    );
}

function InvertBtn ({onInvert}) {


    return (
        <div className='App-column' style={{"align-items":"center"}}>
            <label>Invert</label>
            <div className="App-invertConvert">
                    <button onClick={onInvert}>
                        <InvertArrow className="App-circleArrow" fill='#282c34'/>
                    </button>
            </div>
        </div>
    )

}

function TypeValue({label, symbols, value, onChange}) {

    return (
        <>
            <div className="App-column">
                <label>{label}</label>
                <select value={value} onChange={onChange}>
                    {Object.keys(symbols).map(element => <option value={symbols[element].code}>{symbols[element].description}</option>)}
                </select>
            </div>
        </>
    )
}

function fetchSymbols() {

    return fetch("https://api.exchangerate.host/symbols")
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

function getConvertResult(amount, from, to) {

    return fetch("https://api.exchangerate.host/convert?amount=" 
        + amount 
        + "&from=" 
        + from 
        + "&to="
        + to)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}


function CurrencyChanger() {

    const[symbols, setSymbols] = useState([]);

    const[amountValue, setAmountValue] = useState("1.0");
    const[fromValue, setFromValue] = useState("EUR");
    const[toValue, setToValue] = useState("USD");

    const[result, setResult] = useState("");

    /* This runs on mount *and also* if either dependeces have changed since the last render */
    useEffect(()=>{
        result!== "" ? convertValue() : console.log("attendo")
        return ()=>{setResult("")}
    }, [amountValue, fromValue, toValue])

    /* This runs only on mount (when the component appers)*/ 
    useEffect(() => {
        let ignore = false;

        async function startFetching() {
            const json = await fetchSymbols();
            if(!ignore) {
                console.log(json.symbols)
                setSymbols(json.symbols)
            }
        }
        startFetching();
        // Cleanup function (It can be avoided)
        return ()=>{ignore=true;};
    }, [])

    /* Invert state fromValue and toValue
    */
    function handleInverted() {
        setFromValue(toValue);
        setToValue(fromValue);
    }

    async function convertValue() {
        const result = await getConvertResult(amountValue, fromValue, toValue);
        setResult(result.result);
    }   

    return (
        <>
        <div className="column">
            <div className="App-main">
                <AmountValue value={amountValue} onChange={(event) => setAmountValue(event.target.value)}/>
                <TypeValue label="From" symbols={symbols} value={fromValue} onChange={(event) => setFromValue(event.target.value)} />
                <InvertBtn onInvert={handleInverted}/>
                <TypeValue label="To" symbols={symbols} value={toValue} onChange={(event) => setToValue(event.target.value)} />
                <div className="App-column">
                    <label>Convert</label>
                    <button onClick={convertValue}>Start</button>
                </div>
            </div>
            {(result !== "") ? (<Result value={result} amout={amountValue} from={fromValue} to={toValue}/>): (<p></p>)}
            </div>
        </>
    )
    
}

export default CurrencyChanger;