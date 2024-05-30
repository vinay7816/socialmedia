import React, { useState } from "react";
import useLogin from "../../../Hooks/useLogin";
import useShowToast from "../../../Hooks/useShowtoast";
const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const { login } = useLogin();

    const handleLogin = (e) => {
        e.preventDefault();
        login(input); 
    }

    return (
        <>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="email"
                    id="emailfile"
                    value={input.email}
                    onChange={(e) => setInput({ ...input, email: e.target.value })}
                    placeholder="Email"
                    required={true}
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="password"
                    id="emailpassword"
                    value={input.password}
                    onChange={(e) => setInput({ ...input, password: e.target.value })}
                    placeholder="Password"
                    required={true}
                />
            </div>
            <div className="d-grid gap-2 d-md-block">
                <button className="btn btn-primary form-control submit" type="submit" onClick={handleLogin}>Login</button>
            </div>
            
        </>
    );
};

export default Login;
