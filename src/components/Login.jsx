import React,{useState} from 'react';
import axios from 'axios'


const Login = (props) => {
    
    const[login,setLogin]=useState({
        usu:'',
        pass:''
    })

    const {usu,pass}=login



    const onChange = e =>{
        setLogin({
            ...login,
            [e.target.name]:e.target.value
        })
    }

    // const parseJWT = (token)=>{
    //     let base64Url = token.split('.')[1];
    //     var base64= base64Url.replace('-', '+').replace('_','/');
    //     const datos = JSON.parse(window.atob(base64))

    //     let fecha= new Date(datos.exp*1000)       

    //     var datum = Date.parse('10/21/2020 15:40:30');
    //     const fechaStamp =  datum/1000;       
    //     debugger
    // }

    const onSubmit =async  e => {
        e.preventDefault();
        //validar
        if (usu.trim()===''||pass.trim()==='') {
            alert('llene todos los campos')
            return;
        }

        try {
            const API = await fetch(`http://localhost:4000/api/login/${usu}/${pass}`)
            const respuesta = await API.json()

            if ( Object.keys(respuesta).length !== 0 ) {
                await localStorage.setItem('token',respuesta.token)
                props.history.push('/certificado');
                return
            }else{
                
                alert('usuario incorrecto')
                await localStorage.setItem('token',' ')
                return
            }
            
        } catch (error) {
            throw error
        }
        

    }

    return ( 
        <div className="contenerdor-login">
            <div className="card">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="usu">usuario:</label>
                            <input type="text" name="usu" id="usu" value={usu} onChange={onChange} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pass">contrañesa:</label>
                            <input type="password" name="pass" id="pass" value={pass} onChange={onChange} className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Login;