import { useState } from "react"


const getData = () => {
    console.info('Inside getData method :)')
    return {
        name: 'Sujith',
        marks: 97
    }
}


const InitStateWithFun = () => {

    const [data, setData] = useState(getData);


    return (
        <div>
            <h3>
                InitStateWithFun
            </h3>
            <h4>{JSON.stringify(data, null, 5)}</h4>
            <h4>{data.name}</h4>
            <h4>{data.marks}</h4>
            <button className="btn btn-success" onClick={() => setData( pd => ({...pd, marks : pd.marks + 1})   )} >Increase</button>
        </div>)

}

export default InitStateWithFun;