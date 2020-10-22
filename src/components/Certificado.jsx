import React,{Fragment,useState,useEffect} from 'react';
import tinyPrint from "tiny-print";
// import QRCode from 'qrcode.react'
import { QRCode } from "react-qr-svg";

import Logo from '../img/certificado2.png'
import '../css/estilos.css'

const Certificado = (props) => {
  
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

      const[infousuario,setInfoUsuario]=useState({
        id:'',
        nombre:''
      })

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
            setInfoUsuario(datos.json[0])
          } catch (error) {
            props.history.push('/');
          }
        }
        probando()
      },[])

      const {id,nombre}=infousuario

      
    return (
        <Fragment>
            <header></header>
            <div className="container">
                <figure id="impresion" className="certificado">
                    <img src={Logo} alt=""/>
                    {/* <QRCode className="qr" value="Daniel Guillermo Gorianz Ferrufino" /> */}
                    <QRCode
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="Q"
                      style={{ width: 150 }}
                      value={`${nombre} - ${id}`}
                      className="qr"
                  />
                    <p className="persona">{nombre}</p>
                    
                    <p className="descripcion">Por haber participado en el <span className="negrilla"> Ciclo de Conferencias Educación, paz y conciencia</span>,  como parte de la <span className="negrilla">Cualificación Docente I-2019</span>, realizado el día, <span className="negrilla">12 de Abril</span> del año en curso, en las instalaciones de la Universidad Tecnológica Privada de Santa Cruz.</p>

  
                    <p className="fecha">Santa Cruz de la Sierra, Bolivia – <span className="negrilla2">Abril 2019</span> </p>
                </figure>
                <button onClick={imprimir} className="btnImprimir">
                    Imprimir Certificado
                </button>
            </div>
        </Fragment>
      );
}
 
export default Certificado;