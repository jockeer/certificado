import React,{Fragment,useState,useEffect} from 'react';
import tinyPrint from "tiny-print";
// import QRCode from 'qrcode.react'
import { QRCode } from "react-qr-svg";

import Logo from '../img/certificado2.png'
import '../css/estilos.css'
import Certificado1 from './certificados/Certificado1';
import Certificado2 from './certificados/Certificado2';

import Error from './Error'

const Certificado = (props) => {

  const[infoToken,setInfoToken]=useState({
    id:'',
    nombre:''
  })
  const[infousuario,setInfoUsuario]=useState({
    
  })

  const [certificadoSelect,setCertificadoSelect]=useState('0')
  const [error,setError]=useState(false)
  const [boton,setBoton]=useState(false)

  useEffect(()=>{
    const probando =()=>{
      try {
        
        let token = localStorage.getItem('token')
        let base64Url = token.split('.')[1];
        let base64= base64Url.replace('-', '+').replace('_','/');
        const datos = JSON.parse(window.atob(base64))
      
        let fecha_expiracion= new Date(datos.exp*1000)       
      
        let date= new Date();
        let fecha_actual = Math.floor(date.getTime()/1000);

        if (fecha_actual>datos.exp) {
          props.history.push('/');
          return
        }
        setInfoToken(datos.json[0])
      } catch (error) {
        props.history.push('/');
      }
    }
    probando()
  },[])

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

      

     const onChange=async e=>{
      setCertificadoSelect(e.target.value);
      setInfoUsuario({})
      setBoton(false)
      
    }
    
    const buscar =async () =>{
      const API=await fetch(`http://localhost:4000/api/datosCertificado/${parseInt(infoToken.id)}/${parseInt(certificadoSelect)}`)
      const respuesta = await API.json()
      debugger
      if (respuesta.length===0) {
        setError(true)
        return
      }
      setError(false)
      setInfoUsuario(respuesta[0])
      setBoton(true)
      
     }

      

      
    return (
        <Fragment>
            <header></header>
            <div className="container">
              <div className="container-certificado">
                <div className="form-group">
                  <label htmlFor="certificado_id">Certificado</label>
                  <select name="certificado_id" id="certificado_id" onChange={onChange} className="form-control">
                    <option value="0">Seleccione un certificado...</option>
                    <option value="1">Ciclo de Conferencias Educación, paz y conciencia</option>
                    <option value="2">Capacitación Elaboración del Modelo de Negocio de Cada Carrera a través del Lienzo Canvas</option>
                    <option value="3">Capacitación Herramientas Virtuales Emergentes de Educación</option>
                  </select>
                  <button onClick={buscar} >Buscar Certificado</button>
                </div>

              </div>
              {/* fecha,titulo,subtitulo,nro_certificado */}
              {Object.keys(infousuario).length === 0
              ?null
              :certificadoSelect==='1'
              
                ?<Certificado1 id={infousuario.id} nombre={infousuario.nombre} fecha={infousuario.fecha} subtitulo={infousuario.subtitulo} titulo={infousuario.titulo} nro_certificado={infousuario.nro_certificado} />
                :certificadoSelect==='2'
                  ?<Certificado2 id={infousuario.id} nombre={infousuario.nombre} fecha={infousuario.fecha} subtitulo={infousuario.subtitulo} titulo={infousuario.titulo} nro_certificado={infousuario.nro_certificado} />
                  :null
              }
              {error
                ?<Error mensaje='No tiene certificado' clase="alert alert-warning"/>
                :null
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