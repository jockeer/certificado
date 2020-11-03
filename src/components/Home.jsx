import React,{Fragment,useState,useEffect} from 'react'

import axios from 'axios'


import CertificadoPlantilla from './certificados/CertificadoPlantilla'

import Error from './layout/Error'

import {Link} from 'react-router-dom'

const Home = (props) => {
      const[infoToken,setInfoToken]=useState({
        id:'',
        nombre:''
      })

      const [certificados,guardarCertificados]=useState([]);

      const[certificadosGestion,setCertificadosGestion]=useState([]);

      const [gestiones,guardarGestiones]=useState([])

      const [admin,setAdmin]=useState(false)
      


      useEffect(() => {
        const traerToken =async ()=>{
            try {
              
              let token = localStorage.getItem('token')
              let base64Url = token.split('.')[1];
              let base64= base64Url.replace('-', '+').replace('_','/');
              const datos = JSON.parse(window.atob(base64))

              // debugger
            
            //   let fecha_expiracion= new Date(datos.exp*1000)       
            
              let date= new Date();
              let fecha_actual = Math.floor(date.getTime()/1000);
      
              if (fecha_actual>datos.exp) {
                props.history.push('/');
                return
              }
              
              if (datos.json[0].tipo==='ADMINISTRADOR') {
                setAdmin(true)
              }else{
                setAdmin(false)
              }

              setInfoToken(datos.json[0])
              const API_Gestiones= `http://localhost:4000/api/traerGestiones/${datos.json[0].id}`
              const API_CERTIFICADOS= `http://localhost:4000/api/traerCertificados/${datos.json[0].id}`

              const [info_gestiones,lista_certificado] = await Promise.all([
                axios(API_Gestiones),
                axios(API_CERTIFICADOS)
            ])
            guardarGestiones(info_gestiones.data)
            guardarCertificados(lista_certificado.data)
            setCertificadosGestion(lista_certificado.data)
              
            } catch (error) {
              props.history.push('/');
            }
          }
          traerToken()
      }, [props.history])

      const onChange = e => {
        if (e.target.value==='TODOS') {
          setCertificadosGestion(certificados)
            return
        }
        // setGestionActual(parseInt(e.target.value));

        setCertificadosGestion( certificados.filter( certificado => {
          // debugger
          return certificado.gestion === e.target.value
        }) )
        // obtenerRecursosCategoria(parseInt(e.target.value))
      }

    
    return ( 
        <Fragment>
            <header></header>

            <div className="container reg">
                <br/>
                <h2>Lista de Certificados</h2>
                <h3>Bienvenido: <span><small><b>{infoToken.nombre}</b></small></span>  </h3>
                {admin
                  ? <div><Link to="/registro" className="btn btn-success">Registro de nuevos Usuarios</Link></div>
                  :null
                }
                <hr/>
                <div className="donate">
                  <h2><center><b><u>Mis Certificados</u></b></center></h2>
                  {certificados.length!==0
                    ?<Fragment>
                      <label><input type="radio" value="TODOS" onChange={onChange} name="toggle" defaultChecked/><span><strong>Todos</strong></span></label>
                      {gestiones.map(gestion => {
                        return <label key={gestion.gestion}><input type="radio" value={gestion.gestion} onChange={onChange} name="toggle"/><span><strong>{gestion.gestion}</strong></span></label>
                      })}

                    </Fragment>
                    :<Error mensaje="Usted no tiene ningun certificado" clase="alert alert-danger" />
                  }
                    
                    
                </div>
                <div className="container-certificados">
                  {certificadosGestion.map(certificado=>{
                    return <CertificadoPlantilla key={certificado.id} certificado={certificado}/>
                  })}
                    
                    
                    
                </div>
            </div>

        </Fragment>
     );
}
 
export default Home;