import React,{useState} from 'react'
import axios from 'axios'

import Error from '../Error'

const NuevoUsuario = () => {

    const[usuario,guardarUsuario]=useState({
        nombre:'',
        apellido:'',
        ci:'',
        area:'0',
        tipo:'0'
    })

    const [error, setError] = useState(false)

    const {nombre,apellido,ci,area,tipo} = usuario

    const onChangeUser = async  e => {
        guardarUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const onSubmitUser = async e => {
        e.preventDefault();
        if ( nombre === '' || apellido === '' || ci === '' || area === '0' || tipo === '0') {
            setError(true);
            return;
        }
        setError(false);
        const API= await fetch(`http://localhost:4000/api/verificarPersona/${ci}`)
        const respuesta = await API.json();
        if (respuesta.length!==0) {
            alert('ya existe un usuario registrador con ese carnet de identidad')
            return;
        }

        await axios.post('http://localhost:4000/api/insertarDatos', {
                         nombre: nombre.toUpperCase(),
                         apellido: apellido.toUpperCase(),
                         area: area,
                         tipo: tipo,
                         ci: ci
                     })
                     .then(function (response) {
                         if(response.status===200){
                             // alert('Venta Registrada')
                             console.log('usario registrado')
                             window.location.reload(true);
                         }else{
                             
                             // alert('Error al insertar')
                         }
                         // console.log(response.status);
                     })


    }
    return ( 

        <form onSubmit={onSubmitUser} >
            <div className="form-row">
                <div className="form-group col col-6">
                    <label htmlFor="nombre">nombre</label>
                    <input type="text" name="nombre" id="nombre" value={nombre} onChange={onChangeUser} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="apellido">apellido</label>
                    <input type="text" name="apellido" id="apellido" value={apellido} onChange={onChangeUser} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="ci">carnet de identidad</label>
                    <input type="text" name="ci" id="ci" value={ci} onChange={onChangeUser} className="form-control"/>
                    
                </div>
                <div className="form-group col col-6">
                    <label htmlFor="area">area</label>
                    <select name="area" id="area" onChange={onChangeUser} className="form-control">
                        <option value="0">Seleccione un area..</option>
                        <option value="MECANICA">MECANICA</option>
                        <option value="SISTEMAS">SISTEMAS</option>
                        <option value="INDUSTRIAL Y COMERCIAL">INDUSTRIAL Y COMERCIAL</option>
                        <option value="MARKETING Y PUBLICIDAD">MARKETING Y PUBLICIDAD</option>
                    </select>
                    
                    
                </div>
                <div className="form-group col col-6">
                    
                    <label htmlFor="tipo">tipo</label>
                    <select name="tipo" id="tipo" onChange={onChangeUser} className="form-control">
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
 
export default NuevoUsuario;