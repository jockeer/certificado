import React,{Fragment,useState} from 'react';
import xlsxParser from 'xlsx-parse-json'
import axios from 'axios'
import Error from '../layout/Error'
import {FaArrowLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'

import modeloExcel from '../../certificados/modeloRegistroCertificados.xlsx'
import NuevoCertificado from '../formularios/nuevoCertificado';

import swal from 'sweetalert'

const RegistroCertificado = () => {
    
    const[datosExcel,guardarDatosExcel]=useState([])
    const[error, setError]=useState(false)

    const onChange=(e)=>{
        if(e.target.files[0]===undefined) {
            return;
        }
        // debugger
        try {
            xlsxParser
            .onFileSelection(e.target.files[0])
            .then(data => {
                var parsedData = data;
                // debugger
                // debugger
                if (Object.keys(parsedData).length===0) {
                    swal({
                        title:'Seleccione un Excel valido',
                        icon:'success',
                        timer:'1500'
                    })
                    return
                }
                guardarDatosExcel(parsedData[Object.keys(parsedData)[0]])
                
            });
            
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit=async e=>{
        e.preventDefault();
        if (datosExcel.length===0) {
            setError(true);
            return;
        }
        setError(false);
        await datosExcel.map(async date => {
            // debuggerk
            try {
                const API = await fetch(`http://localhost:4000/api/consultarID/${date.ci}`)
                // debugger
                const respuesta = await API.json();
                console.log(respuesta[0].id)
                //nombre,area,docente,encuentro_1,encuentro_2,certificado
                await axios.post('http://localhost:4000/api/insertarCertificado', {
                    id_persona: parseInt(respuesta[0].id),
                    id_certificado: 1,
                    semestre: date.semestre,
                    gestion: date.gestion,
                    mes: date.mes,
                    dia: date.dia,
                    nro_certificado: date.certificado
                 })
                 .then(function (response) {
                     if(response.status===200){
                       console.log('certificado Registrado');
                         
                     }else{
                         
                         console.log('Error al registrar');
                     }
                         
                        
                 })
                
            } catch (error) {
                throw error
            }

        })
        await swal({
            title:'Certificados registrados correctamente',
            icon:'success',
            timer:'1500'
        })

        window.location.reload(true);

    }

    return ( 
        <Fragment>
            <header>
                <div className="container">
                    <Link to="/home">
                        <FaArrowLeft className="btn-atras"/>
                    </Link>

                </div>
            </header>
            <div className="container reg">
                <div className="container-opciones-registro">
                    
                    <div className="item">
                        <br/>
                            <h2> <b>Registro masivo de certificados</b></h2>
                        <br/>
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="file">Seleccione su archivo excel</label>
                               
                                <input type="file" name="file" id="file" onChange={onChange}/>
                                <br/>
                                <p><small><i>El archivo EXCEL debe seguir el siguiente modelo de documento: </i> <span>	
                                            <a href={modeloExcel} download="registro.xlsx">registroCertificado.xlsx</a></span> </small></p>
                            </div>
                            {error
                                ?<Error mensaje="Seleccione un excel valido" clase="alert alert-danger" />
                                :null
                            }
                            <button type="submit" className="btn btn-primary">Registrar Lista de excel</button>
                        </form>
                    </div>
                    <div className="item">
                        <br/>
                            <h2> <b>Registro individual de certificados</b></h2>
                        <br/>   
                        <NuevoCertificado/>
                    </div>
                    
                </div>
                <hr/>
               
                
                <h2>Lista</h2>

                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">semestre</th>
                        <th scope="col">gestion</th>
                        <th scope="col">mes</th>
                        <th scope="col">dia</th>
                        <th scope="col">nro_certificado</th>
                        <th scope="col">ci</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosExcel.map(dato => {
                            return  <tr key={dato.Numero}>
                                        <th scope="row">{dato.Numero}</th>
                                        <td>{dato.Nombre_Apellido}</td>
                                        <td>{dato.semestre}</td>
                                        <td>{dato.gestion}</td>
                                        <td>{dato.mes}</td>
                                        <td>{dato.dia}</td>
                                        <td>{dato.certificado}</td>
                                        <td>{dato.ci}</td>

                                    </tr>
                        })}
                        
                    </tbody>
                    </table>
            </div>
        </Fragment>
     );
}
 
export default RegistroCertificado;