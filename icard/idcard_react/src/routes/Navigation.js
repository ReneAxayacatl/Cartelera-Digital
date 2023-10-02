import React from "react";
import {BrowserRouter, Routes, Route /*Link,*/} from "react-router-dom";
import {map} from "lodash";
import routes from "./routes";


export function Navigation() {
    return (
    <BrowserRouter>
        {/* 👇️  */}
            <Routes>
                {map(routes, (route, index) =>(
                    // <Route path="/" element={<Navigations />} />
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <route.layout>      
                                <route.component/>
                            </route.layout>
                        }
                    />
                ))}
            </Routes>
        
    </BrowserRouter>
    );
}

// function Navigations() {
//     return <h2>Navigation...</h2>;
// }
