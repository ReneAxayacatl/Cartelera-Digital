import React from 'react';
import {LoginForm} from "../../../components/Admin";
// import {ReactComponent as IcTable} from "../../../assets/mesita.svg";
import {ReactComponent as IcTable} from "./logoRestaurante.svg";
// import "./logoRest.svg";
import "./LoginAdmin.scss";

export function LoginAdmin() {
    return (
        <div className="login-admin">
            <div className="login-admin__content">
                <h3>Entrar al panel</h3>
                <IcTable className='logoRest'/>
                {/* <img src="logoRest.svg" alt="Logo Cocina"/> */}
                <LoginForm/>
            </div>
        </div>
    );
}
