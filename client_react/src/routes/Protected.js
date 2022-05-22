import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ENUM_USER_ROLES } from "../enums";

const Protected = (props) => {
    const { authorizedFor, children } = props;
    const { user } = useContext(AppContext);

    if (authorizedFor === ENUM_USER_ROLES.ADMIN && user.role === ENUM_USER_ROLES.ADMIN) {
        return children;
    }
    return <Navigate to="/error/403" replace={true} />
};

export default Protected;