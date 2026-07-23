import './Counter.css';

interface CounterProps {
    value: number;
    onChange: (value: number) => void;
}

export default function Counter({ value, onChange }: CounterProps){

    const decrementCounter= function(){
        if(value === 1){
            return;
        }
        onChange(value - 1);
    }

    const incrementCount= function(){
        if(value > 100){
            return;
        }
        onChange(value + 1);
    }

    return (
        <div className='counter-container'>
            <button className='counter' onClick={()=> decrementCounter()}>-</button>
            <span className='counter-count'>{value}</span>
            <button className='counter' onClick={()=> incrementCount()}>+</button>
        </div>
    )
}