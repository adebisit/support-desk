import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { toast } from 'react-toastify'
import { createTicket, reset } from "../features/ticket/ticketSlice"
import Spinner from '../components/Spinner'
import BackButton from "../components/BackButton"


function NewTicket() {
    const {user} = useSelector(state => state.auth)
    const {isError, isSuccess, isLoading, message} = useSelector(state => state.ticket)

    const [name] = useState(user.name)
    const [email] = useState(user.email)

    const [product, setProduct] = useState("iPhone")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/tickets')
        }
        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])
    

    const onSubmit = (e) => {
        e.preventDefault()
        const ticketInfo = {product, title, description}
        dispatch(createTicket(ticketInfo))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url='/'/>
            <section className="heading">
                <h1>Create New Ticket</h1>
                <p>Please fill out the form below</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" className="form-control" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Customer Email</label>
                    <input type="text" className="form-control" value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select name="product" id="product" className="form-control" value={product} onChange={(e) => setProduct(e.target.value)}>
                            <option value='iPhone'>iPhone</option>
                            <option value='Macbook Pro'>Macbook Pro</option>
                            <option value='iMac'>iMac</option>
                            <option value='iPad'>iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            name="title"
                            id="title"
                            className="form-control"
                            placeholder='Enter a title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className="form-control"
                            placeholder='Enter a Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default NewTicket