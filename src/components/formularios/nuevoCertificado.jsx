import React,{useState} from 'react';

import Error from '../layout/Error'

import axios from 'axios'

const NuevoCertificado = () => {

    const[certificado, guardarCertificado]=useState({
        ci:'',
        id_persona:'',
        id_certificado:'',
        semestre:'',
        gestion:'',
        mes:'',
        dia:'',
        nro_certificado:''
    })


    
    const[error, setError]=useState(false)

    const[verificacion, setVerificacion] = useState(false)
    
    const {ci,id_persona,id_certificado,semestre,gestion,mes,dia,nro_certificado}=certificado

    const onChangeCertificado = async e => {
        guardarCertificado({
            ...certificado,
            [e.target.name]:e.target.value
        })
    } 
    
    const onSubmitCertificado = async e => {
        e.preventDefault();
    }
    const verificarUsuario = async e => {
        const API =await fetch(`http://localhost:4000/api/verificarPersona/${ci}`) 
        const respuesta = await API.json();
        debugger
        if (respuesta.length===0) {
            setVerificacion(true);
            return
        }
        
        setVerificacion(false)
        
    }
    
    return ( 
        <form onSubmit={onSubmitCertificado} >
            <div className="form-row">
                <div className="form-group col col-12">
                    <label htmlFor="ci">carnet de identidad</label>
                    <input type="text" name="ci" id="ci" value={ci}  onChange={onChangeCertificado} className="form-control mb-2"/>
                    {verificacion
                        ?<Error mensaje="no existe una persona registrada con este carnet" clase="alert alert-danger" />
                        :null
                    }
                    <button onClick={verificarUsuario} className="btn btn-info ">verificar</button>
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="apellido">apellido</label>
                    <input type="text" name="apellido" id="apellido"  onChange={onChangeCertificado} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="ci">carnet de identidad</label>
                    <input type="text" name="ci" id="ci"onChange={onChangeCertificado} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    <label htmlFor="area">area</label>
                    <select name="area" id="area" onChange={onChangeCertificado} className="form-control">
                        <option value="0">Seleccione un area..</option>
                        <option value="MECANICA">MECANICA</option>
                        <option value="SISTEMAS">SISTEMAS</option>
                        <option value="INDUSTRIAL Y COMERCIAL">INDUSTRIAL Y COMERCIAL</option>
                        <option value="MARKETING Y PUBLICIDAD">MARKETING Y PUBLICIDAD</option>
                    </select>
                    
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="tipo">tipo</label>
                    <select name="tipo" id="tipo" onChange={onChangeCertificado} className="form-control">
                        <option value="0">Seleccione un Tipo..</option>
                        <option value="DOCENTE">DOCENTE</option>
                        <option value="ENCARGARDO LAB. ELECTRONICA">ENCARGARDO LAB. ELECTRONICA</option>
                        <option value="ENCARGADO LAB. CIENCIAS BASICAS">ENCARGADO LAB. CIENCIAS BASICAS</option>

                    </select>
                    
                </div>

            </div>
            {error
                ?<Error mensaje="todos los campos deben estar llenados correctamente" clase="alert alert-danger" />
                :null
            }
            
            <button type="submit" className="btn btn-primary">Registrar Usuario</button>
        </form>
     );
}
 
export default NuevoCertificado;