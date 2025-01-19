import React, { lazy, useState, useEffect, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import { useCurrentUserContext } from "shared-contexts";

function Loading() {
    return <h2>🌀 Loading...</h2>;
}

const Auth = lazy(() => import('auth/Auth').catch(() => {
    return { default: () => <div className='error'>Component is not available!</div> };
}));

const Root = () => {


    const { currentUser, setCurrentUser } = useCurrentUserContext();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const history = useHistory();

    function handleUserChange(event) {
        setCurrentUser({ ...currentUser, ...event.detail });
        setIsLoggedIn(true)
        history.push("/")
    }


    function handleUserProfileChange(event) {
        setCurrentUser((curUser) => { return { ...curUser, profile: event.detail } });
    }

    function handleUserRegistered(event) {
        history.push("/signin")
    }

    useEffect(() => {
        addEventListener("user-change", handleUserChange);
        return () => removeEventListener("user-change", handleUserChange)
    }, []);

    useEffect(() => {
        addEventListener("user-registered", handleUserRegistered);
        return () => removeEventListener("user-registered", handleUserRegistered)
    }, []);


    useEffect(() => {
        addEventListener("user-profile-change", handleUserProfileChange);
        return () => removeEventListener("user-profile-change", handleUserProfileChange)
    }, []);


    const onSignOut = () => {

        setCurrentUser(null);
        setIsLoggedIn(false);

        dispatchEvent(new CustomEvent("user-signout", {}));
    };


    return (
        <div className="page__content">
            <Header onSignOut={onSignOut} />
            <Switch>
                <Route exact path="/">
                    {
                        () => isLoggedIn ? <Content /> : <Redirect to="./signin" />
                    }
                </Route>
            </Switch>
            <Suspense fallback={<Loading />}>
                <Auth />
            </Suspense>
            <Footer />
        </div>)
};

export default Root;