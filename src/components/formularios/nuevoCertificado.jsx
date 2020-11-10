import React,{useState} from 'react';

import Error from '../layout/Error'

import axios from 'axios'
import swal from 'sweetalert';

const NuevoCertificado = () => {

    const[certificado, guardarCertificado]=useState({
        ci:'',
        id_persona:'0',
        id_certificado:'0',
        semestre:'0',
        fecha:'0',
        nro_certificado:'0'
    })


    
    const[error, setError]=useState(false)

    const[verificacion, setVerificacion] = useState(false)
    
    const {ci,id_persona,id_certificado,semestre,fecha,nro_certificado}=certificado

    const onChangeCertificado = async e => {
        guardarCertificado({
            ...certificado,
            [e.target.name]:e.target.value
        })
    } 
    
    const onSubmitCertificado = async e => {
        e.preventDefault();
        if (id_persona==='0'||id_certificado==='0'||semestre==='0'||fecha==='0'||nro_certificado==='0') {
            setError(true);
            return;
        }
        setError(false);
        console.log(fecha)
        debugger
        await axios.post('http://localhost:4000/api/insertarCertificado',{
            id_persona:parseInt(id_persona),
            id_certificado:parseInt(id_certificado),
            semestre:semestre,
            gestion:fecha.substr(0,4),
            mes:fecha.substr(5,2),
            dia:fecha.substr(8,2),
            nro_certificado:nro_certificado

        }).then(respuesta=>{
            if (respuesta.status===200) {
                swal({
                    title:'Certificado Registrado correctamente',
                    icon:'success',
                    timer:'1500'
                })
            }else{
                
                swal({
                    title:'Error al registrar',
                    icon:'error',
                    timer:'1500'
                })
            }
        })
    }


    const verificarUsuario = async e => {
        if (ci==='') {
            setVerificacion(true);
            return;
        }
        setVerificacion(false)
        const API =await fetch(`http://localhost:4000/api/verificarPersona/${ci}`) 
        const respuesta = await API.json();
        // debugger
       
        if (respuesta.length === 0) {
            setVerificacion(true);
            return;
        }
        guardarCertificado({
            ...certificado,
            id_persona: respuesta[0].id
        })
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
                    <button type="button" onClick={verificarUsuario} className="btn btn-info ">verificar</button>
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="semestre">Semestre</label>
                    <select  name="semestre" id="semestre"  onChange={onChangeCertificado} className="form-control">
                        <option value="0">Seleccione un Semestre..</option>
                        <option value="I">Semestre I</option>
                        <option value="II">Semestre II</option>
                    </select>
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="nro_certificado">Nro de certificado</label>
                    
                    <input type="number" name="nro_certificado" id="nro_certificado"  onChange={onChangeCertificado} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    <label htmlFor="area">Fecha</label>
                    <input type="date" name="fecha" className="form-control" onChange={onChangeCertificado} id=""/>
                    
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="id_certificado">certificado</label>
                    <select name="id_certificado" id="id_certificado" onChange={onChangeCertificado} className="form-control">
                        <option value="0">Seleccione un certificado..</option>
                        <option value="1">Ciclo de Conferencias Educación, paz y conciencia</option>
                        <option value="2">Capacitación Elaboración del Modelo de Negocio de Cada Carrera a través del Lienzo Canvas</option>
                        <option value="3">Capacitación Herramientas Virtuales Emergentes de Educación</option>
                        

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