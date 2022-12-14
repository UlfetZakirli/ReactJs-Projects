import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { USER_PER_PAGE } from './../utils/constant';
export const UsersContext = createContext()
const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [pages, setPages] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    console.log(users);

    const fetchUsers = async () => {
        const response = await axios.get('https://randomuser.me/api/?page=1&results=50&nat=us')
        const data =await response.data.results
        setUsers(data)
        setLoading(false)
        setTotalPages(Math.ceil(data.length / USER_PER_PAGE))

    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const value = {
        users,
        loading,
        pages,
        totalPages,
        setUsers,
        setPages,

    }
    return (
        <UsersContext.Provider value={value}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider