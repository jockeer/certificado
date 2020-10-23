import React,{Fragment,useState} from 'react';
import xlsxParser from 'xlsx-parse-json'
import axios from 'axios'

const Registro = () => {
    
    const[datosExcel,guardarDatosExcel]=useState([])

    const onChange=(e)=>{
        // debugger
        try {
            xlsxParser
            .onFileSelection(e.target.files[0])
            .then(data => {
                var parsedData = data;
                // debugger
                // debugger
                if (parsedData.CANVAS===undefined) {
                    alert('Seleccione un excel valido')
                    return
                }
                guardarDatosExcel(parsedData.CANVAS)
                
            });
            
        } catch (error) {
            throw error
        }
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        if (datosExcel.length===0) {
            return 
        }
        datosExcel.map(date=>{
            //nombre,area,docente,encuentro_1,encuentro_2,certificado
            axios.post('http://localhost:4000/api/insertarDatos', {
                nombre: date.Nombre_Apellido,
                area: date.Area,
                docente: date.DOCENTE,
                encuentro_1: date.encuentro_1,
                encuentro_2: date.encuentro_2,
                certificado: date.certificado,
            })
            .then(function (response) {
                if(response.status===200){
                    // alert('Venta Registrada')
                    
                }else{
                    
                    // alert('Error al insertar')
                }
                // console.log(response.status);
            })

        })

        guardarDatosExcel([])



    }

    return ( 
        <Fragment>
            <header></header>
            <div className="container reg">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="file" name="file" id="file" className="form-control" onChange={onChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
                <h2>Lista</h2>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre y Apellido</th>
                        <th scope="col">Area</th>
                        <th scope="col">Docente</th>
                        <th scope="col">1er Encuentro</th>
                        <th scope="col">2do Encuentro</th>
                        <th scope="col">Nro. de Certificado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosExcel.map(dato => {
                            return  <tr key={dato.Numero}>
                                        <th scope="row">{dato.Numero}</th>
                                        <td>{dato.Nombre_Apellido}</td>
                                        <td>{dato.Area}</td>
                                        <td>{dato.DOCENTE}</td>
                                        <td>{dato.encuentro_1}</td>
                                        <td>{dato.encuentro_2}</td>
                                        <td>{dato.certificado}</td>
                                    </tr>
                        })}
                        
                    </tbody>
                    </table>
            </div>
        </Fragment>
     );
}
 
export default Registro;