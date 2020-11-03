import React,{Fragment} from 'react'
import Logo from '../../img/certificado2.png'
import { QRCode } from "react-qr-svg";
import { FaArrowLeft } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Certificado1 = ({id,nombre,semestre,gestion,mes,dia,titulo,subtitulo,nro_certificado}) => {

  const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    return ( 
      <Fragment>
        <div className="jumbotron">
          <Link  to='/home'>
            <FaArrowLeft className="btnsss"/>
          </Link>
          <div className="titulo">
            <b>Certificado de: </b> 
            {titulo}

          </div>
        </div>

        <figure id="impresion" className="certificado">
          <img src={Logo} alt=""/>
          <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: 150 }}
            value={`${nombre} - ${nro_certificado}`}
            className="qr"
          />
          <p className="persona">{nombre}</p>
          
          <p className="descripcion">Por haber participado en el <span className="negrilla"> {titulo}</span>,  como parte de la <span className="negrilla">{subtitulo} {semestre}-{gestion}</span>, realizado el día, <span className="negrilla">{dia} de {meses[parseInt(mes)-1]}</span> del año en curso, en las instalaciones de la Universidad Tecnológica Privada de Santa Cruz.</p>

          <p className="fecha">Santa Cruz de la Sierra, Bolivia – <span className="negrilla2">{meses[parseInt(mes)-1]} {gestion} </span> </p>
          <p className="nro_certificado">Nº {nro_certificado}</p>
      </figure>

      </Fragment>
     );
}
 
export default Certificado1;