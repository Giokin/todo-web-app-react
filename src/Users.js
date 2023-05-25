import React from "react";
import { useSelector, useDispatch } from "react-redux";


const Users = () => {
    const {users} = useSelector(state => state);
    const dispatch = useDispatch();
    return (
        <div>
            <ul>
                {
                    users.map(user => {
                        return(
                            <li>{user.username}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Users;