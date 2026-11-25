import {Navigate,Outlet,useLocation} from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated:boolean;
    isLoading?:boolean;
    redirectPath?:String;
}


export const ProtectedRoute=({
    isAuthenticated,
    isLoading=false,
    redirectPath='/login'
}:ProtectedRouteProps)=>{
    const location=useLocation();



    if(isLoading){
        return <div>Loading...</div>
    }

    if(!isAuthenticated){
        return <Navigate to={redirectPath} state={{from: location}} replace />;
    }

    return <Outlet />;
} 