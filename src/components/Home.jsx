import React,{Fragment,useState,useEffect} from 'react'

import Muestra from '../img/MUESTRA.PNG'

import printing from '../img/printing.png'

const Home = (props) => {
    const[infoToken,setInfoToken]=useState({
        id:'',
        nombre:''
      })

      useEffect(() => {
        const traerToken =()=>{
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
          traerToken()
      }, [])

    const onClick = (e) =>{
        debugger
        props.history.push(`/certificado/${infoToken.id}`)
    }
    return ( 
        <Fragment>
            <header></header>

            <div className="container">
                <br/>
                <h2>Lista de Certificados</h2>
                <hr/>

                <div className="container-certificados">
                    <div className="card sombra">
                        <div className="card-header">
                            {/* <button>impresion</button> */}
                        </div>
                        <div className="card-body">
                            <figure>
                                <img src={Muestra} alt=""/>
                            </figure>
                            <button onClick={onClick} value="ss" className="material-icons">
                                <img className="" src={printing} />
                            </button>
                        </div>
                        <div className="card-footer">
                        Capacitación Elaboración del Modelo de Negocio de Cada Carrera a través del Lienzo Canvas
                        </div>
                    </div>
                    
                    
                </div>
            </div>

        </Fragment>
     );
}
 
export default Home;