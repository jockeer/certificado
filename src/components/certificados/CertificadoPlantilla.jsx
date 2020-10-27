import React from 'react'
import Muestra from '../../img/MUESTRA.PNG'

import printing from '../../img/printing.png'

import {Link} from 'react-router-dom'

const CertificadoPlantilla = ({certificado}) => {
    
    return ( 
        <div className="card sombra">
                        <div className="card-header">
                            {/* <button>impresion</button> */}
                        </div>
                        <div className="card-body">
                            <figure>
                                <img src={Muestra} alt=""/>
                            </figure>
                            <Link to={`/certificado/${certificado.id}`} value="ss" className="material-icons">
                                <img className="" src={printing} alt=""/>
                            </Link>
                        </div>
                        <div className="card-footer">
                        {certificado.titulo}
                        </div>
                    </div>
     );
}
 
export default CertificadoPlantilla;