import React,{Fragment,useState} from 'react';
import xlsxParser from 'xlsx-parse-json'
import axios from 'axios'
import modeloExcel from '../certificados/modeloRegistroUsuarios.xlsx'
import NuevoUsuario from './formularios/nuevoUsuario';

import {Link} from 'react-router-dom'

const Registro = () => {
    
    const[datosExcel,guardarDatosExcel]=useState([])

    const onChange=(e)=>{
        if(e.target.files[0]===undefined) {
            return;
        }
        try {
            xlsxParser
            .onFileSelection(e.target.files[0])
            .then(data => {
                var parsedData = data;

                if (Object.keys(parsedData).length===0) {
                    alert('Seleccione un excel valido')
                    return
                }

                guardarDatosExcel(parsedData[Object.keys(parsedData)[0]])
                
            });
            
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit=async e=>{
        e.preventDefault()
        if (datosExcel.length===0) {
            return 
        }
        await datosExcel.map(async date => {
            //nombre,area,docente,encuentro_1,encuentro_2,certificado
            try {
                const API= await fetch(`http://localhost:4000/api/verificarPersona/${date.ci}`)
                const respuesta = await API.json();

                if (respuesta.length===0) {
                    await axios.post('http://localhost:4000/api/insertarDatos', {
                         nombre: date.nombre,
                         apellido: date.apellido,
                         area: date.area,
                         tipo: date.tipo,
                         ci: date.ci
                     })
                     .then(function (response) {
                         if(response.status===200){
                             // alert('Venta Registrada')
                             console.log('usario registrado')
                         }else{
                             
                             // alert('Error al insertar')
                         }
                         // console.log(response.status);
                     })
                    
                }else{
                    console.log('usuario ya registrado');
                }
                
            } catch (error) {
                throw error
            }

        })

        window.location.reload(true);

    }

    return ( 
        <Fragment>
            <header>
                <div className="container">
                    <Link to="/home" className="btn-atras" ><i className="material-icons">arrow_back</i></Link>
                </div>
            </header>
            <div className="container reg">
                <div className="container-opciones-registro">
                    <div className="item">
                        <br/>
                        <h2> <b>Registro masivo de usuarios</b></h2>
                        <br/>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="file">Seleccione su archivo Excel</label>
                                <br/>
                                <input type="file" name="file" id="file" className="" onChange={onChange}/>
                                <br/>
                                <p><small><i>El archivo EXCEL debe seguir el siguiente modelo de documento: </i> <span>	
                                    <a href={modeloExcel} download="registro.xlsx">registro.xlsx</a></span> </small></p>
                            </div>
                            <button type="submit" className="btn btn-success">Registrar Lista de Excel</button>
                        </form>

                    </div>
                    <div className="item">
                        <br/>
                        <h2> <b>Registro individual de usuarios</b></h2>
                        <br/>
                        <NuevoUsuario/>

                    </div>

                </div>
                <h2>Lista</h2>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">area</th>
                        <th scope="col">tipo</th>
                        <th scope="col">ci</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosExcel.map(dato => {
                            return  <tr key={dato.Numero}>
                                        <th scope="row">{dato.Numero}</th>
                                        <td>{dato.apellido}</td>
                                        <td>{dato.nombre}</td>
                                        <td>{dato.area}</td>
                                        <td>{dato.tipo}</td>
                                        <td>{dato.ci}</td>
                                    </tr>
                        })}
                        
                    </tbody>
                    </table>
            </div>
        </Fragment>
     );
}
 
export default Registro;