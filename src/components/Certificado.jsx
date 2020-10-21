import React,{Fragment} from 'react';
import tinyPrint from "tiny-print";
// import QRCode from 'qrcode.react'
import { QRCode } from "react-qr-svg";

import Logo from '../img/certificado.png'
import '../css/estilos.css'

const Certificado = () => {
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
          
          `
        });
      }
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
                      value="Daniel Guillermo Gorianz Ferrufino"
                      className="qr"
                  />
                    <p className="persona">Daniel Guillermo Gorianz Ferrufino</p>
                </figure>
                <button onClick={imprimir} className="btnImprimir">
                    Imprimir Certificado
                </button>
            </div>
        </Fragment>
      );
}
 
export default Certificado;