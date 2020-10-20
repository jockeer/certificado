import React,{Fragment} from 'react';
import tinyPrint from "tiny-print";
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
          .certificado .persona{
            position: absolute;
            top: 30%;
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
                    <p className="persona">Nombre de la Persona</p>
                </figure>
                <button onClick={imprimir} className="btnImprimir">
                    Imprimir Cerficidado
                </button>
            </div>
        </Fragment>
      );
}
 
export default Certificado;