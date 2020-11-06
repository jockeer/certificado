import React,{Fragment,useState,useEffect} from 'react';
import tinyPrint from "tiny-print";

import '../../css/estilos.css'
import Certificado1 from './Certificado1';


import {Link} from 'react-router-dom'
import {BiExit} from 'react-icons/bi'
import { FaUser } from "react-icons/fa";


const Certificado = (props) => {


  const[infoCertificado,setInfoCertificado]=useState({
    
  })

  const[infoToken, setInfoToken] = useState({
    id:'',
    nombre:''
  })


  useEffect(()=>{
    const traerToken = async()=>{
      try {
        
        let token = localStorage.getItem('token')
        let base64Url = token.split('.')[1];
        let base64= base64Url.replace('-', '+').replace('_','/');
        const datos = JSON.parse(window.atob(base64))
      
        // let fecha_expiracion= new Date(datos.exp*1000)       
      
        let date= new Date();
        let fecha_actual = Math.floor(date.getTime()/1000);

        if (fecha_actual>datos.exp) {
          props.history.push('/');
          return
        }
        setInfoToken(datos.json[0])

        const API = await fetch(`http://localhost:4000/api/datosCertificado/${props.match.params.id}`)
        const respuesta = await API.json()
        setInfoCertificado(respuesta[0])
      } catch (error) {
        props.history.push('/');
      }
    }
    traerToken()
  },[props.history,props.match])

  // const {id,nombre,fecha,titulo,subtitulo,nro_certificado}=infousuario
  // const {id:IDTOKEN,nombre:nombretoken}=infoToken
  
    const imprimir = () =>{
        tinyPrint(document.getElementById('impresion'), {
          scanStyles: true,
          scanHTML: true,
          hidePageRule: true,
          importStyles:
            ["../css/estilos.css"],
          cssStyle: `
          .certificado img{
            width: 100% !important;
          }
          .certificado .qr{
            position: absolute;
            bottom:80px !important;
            left: 30px !important;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .certificado .persona{
            position: absolute;
            top: 50%;
            left: 28%;
            bottom: 0;
            right: 0;
            font-size: 50px !important;
            font-family:cursive;
            font-weight: bold;
        }
        .certificado .descripcion{
          position: absolute;
          top: 20%;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 28px !important;
          line-height: 40px !important;
          width: 80%;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          font-weight: bold;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
      
      }
        .certificado .fecha{
          position: absolute;
          top: 20%;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          font-size: 22px !important;
          line-height: 40px !important;
          width: 80%;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          font-weight: bold;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
      
      }
      .negrilla{
        font-size: 28px !important;
        font-weight: 900;
      }
      .negrilla2{
        font-size: 22px !important;
        font-weight: 900;
      }
          
          `
        });
      }

    return (
        <Fragment>
            <header>
              <div className="container" style={{justifyContent:'space-between'}}>
                <div>
                <FaUser className="icon-user mr-2"/><span className="text-white"><small><b>{infoToken.nombre.toUpperCase()}</b></small></span>
                  
                </div>
                <Link to='/' className="btn-cerrar-sesion">
                  <span> <small>Cerrar Sesion</small> </span> <BiExit className="btn-atras"/>
                </Link>
              </div>
            </header>
            <div className="container reg">
              

              {Object.keys(infoCertificado).length === 0
              ?null
              :<Certificado1 
                id={infoCertificado.id} 
                nombre={infoCertificado.nombre} 
                semestre={infoCertificado.semestre} 
                gestion={infoCertificado.gestion} 
                mes={infoCertificado.mes} 
                dia={infoCertificado.dia} 
                subtitulo={infoCertificado.subtitulo} 
                titulo={infoCertificado.titulo} 
                nro_certificado={infoCertificado.nro_certificado} 
              />
              
              }
              
                
              <button onClick={imprimir} className="btnImprimir">
                  Imprimir Certificado
              </button>
                    
                
            </div>
        </Fragment>
      );
}
 
export default Certificado;