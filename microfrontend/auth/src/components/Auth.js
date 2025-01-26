import React, { useEffect, useState } from "react";
import { Route, useHistory, Switch, Redirect } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import AuthTooltip from "./AuthTooltip.js";

import * as auth from "../utils/auth.js";

function Auth() {

    const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
    const [tooltipStatus, setTooltipStatus] = useState("");

    const history = useHistory();

    // при монтировании App описан эффект, проверяющий наличие токена и его валидности
    useEffect(() => {

        const token = localStorage.getItem("jwt");

        if (token) {

            auth
                .checkToken(token)
                .then((res) => {

                    dispatchEvent(new CustomEvent("user-change", {

                        detail: { email: res.data.email }

                    }));

                    history.push("/");
                })
                .catch((err) => {

                    localStorage.removeItem("jwt");
                    console.log(err);

                });
        }

    }, [history]);


    useEffect(() => {

        addEventListener("user-signout", handleUserSignout);
        return () => removeEventListener("user-signout", handleUserSignout)

    }, []);


    function onRegister({ email, password }) {

        auth
            .register(email, password)
            .then((res) => {

                setTooltipStatus("success");
                setIsInfoToolTipOpen(true);

                dispatchEvent(new CustomEvent("user-registered", {}));

            })
            .catch((err) => {

                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);

            });
    }

    function onLogin({ email, password }) {
        auth
            .login(email, password)
            .then((res) => {


                dispatchEvent(new CustomEvent("user-change", {

                    detail: { email }

                }));

            })
            .catch((err) => {

                setTooltipStatus("fail");
                setIsInfoToolTipOpen(true);

            });
    }

    const closeAllPopups = () => {
        setIsInfoToolTipOpen(false);
    };

    function handleUserSignout(event) {
        localStorage.removeItem("jwt");
    }

    return (<>
        <Switch>
            <Route path="/signup">
                <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
                <Login onLogin={onLogin} />
            </Route>
        </Switch>
        <AuthTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            status={tooltipStatus}
        />
    </>)
}

export default Auth;