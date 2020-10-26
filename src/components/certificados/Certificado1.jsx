import React from 'react'
import Logo from '../../img/certificado2.png'
import { QRCode } from "react-qr-svg";

const Certificado1 = ({id,nombre,fecha,titulo,subtitulo,nro_certificado}) => {
    return ( 
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
        
        <p className="descripcion">Por haber participado en el <span className="negrilla"> {titulo}</span>,  como parte de la <span className="negrilla">{subtitulo} {fecha !== undefined ?fecha.substr(0,10):null}</span>, realizado el día, <span className="negrilla">{fecha !== undefined ?fecha.substr(0,10):null}</span> del año en curso, en las instalaciones de la Universidad Tecnológica Privada de Santa Cruz.</p>


        <p className="fecha">Santa Cruz de la Sierra, Bolivia – <span className="negrilla2">{fecha !== undefined ?fecha.substr(0,10):null} </span> </p>
        <p className="nro_certificado">Nº {nro_certificado}</p>
    </figure>
     );
}
 
export default Certificado1;