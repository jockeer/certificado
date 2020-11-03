import React,{Fragment,useState,useEffect} from 'react';
import tinyPrint from "tiny-print";
// import QRCode from 'qrcode.react'
// import { QRCode } from "react-qr-svg";

// import Logo from '../img/certificado2.png'
import '../css/estilos.css'
import Certificado1 from './certificados/Certificado1';

import Error from './Error'

const Certificado = (props) => {

  const[infoToken,setInfoToken]=useState({
    id:'',
    nombre:''
  })
  const[infoCertificado,setInfoCertificado]=useState({
    
  })

  const [certificadoSelect,setCertificadoSelect]=useState('0')
  const [error,setError]=useState(false)
  const [boton,setBoton]=useState(true)

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
  },[props.history])

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
            <header></header>
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
              
                {boton
                    ?<button onClick={imprimir} className="btnImprimir">
                    Imprimir Certificado
                </button>
                    :null
                }
                
            </div>
        </Fragment>
      );
}
 
export default Certificado;