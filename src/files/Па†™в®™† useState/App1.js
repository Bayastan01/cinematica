import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

export default function App1() {
    const [count, setcount] = useState(JSON.parse(localStorage.getItem('count')) || 0)
    const [state, setstate] = useState(JSON.parse(localStorage.getItem('state')) || [])
    const [name, setname] = useState('')
    const [surname, setsurname] = useState('')
    const [number, setnumber] = useState('')

    useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
        return () => {
            
        }
    }, [state])

    useEffect(() => {
        localStorage.setItem('count', JSON.stringify(count))
        return () => {
        
        }
    }, [count])

    const SetCode = () => {
        setstate((p) => {
            return [...state, { name, surname, number }]
        })

        setname('')
        setsurname('')
        setnumber('')
    }
    return (
        <div>
            <span onClick={() => setcount(p => p -1)}>-</span>
            <span>{count}</span>
            <span onClick={() => setcount(p => p +1)}>+</span>
            <div>
                <Form.Group onChange={e => setname(e.target.value)} controlId="formBasicEmail2">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Name" />
                </Form.Group>

                <Form.Group onChange={e => setsurname(e.target.value)} controlId="formBasicPassword22">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" value={surname} placeholder="Surname" />
                </Form.Group>
                <Form.Group onChange={e => setnumber(e.target.value)} className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Number</Form.Label>
                    <Form.Control type="number" value={number} placeholder="Number" />
                </Form.Group>
                <Button onClick={SetCode} variant="primary" type="sumbit ">
                    Submit
                </Button>
            </div>
            <table border='1' style={{ width: '100%' }}>
                <tr style={{ border: '1px solid black' }}>
                    <td style={{ border: '1px solid black ' }}>#</td>
                    <td style={{ border: '1px solid black ' }}>Имя</td>
                    <td style={{ border: '1px solid black ' }}>Фамиля</td>
                    <td style={{ border: '1px solid black ' }}>Номер</td>
                </tr>
                {
                    state.map((item, i) => {
                        return (
                            <>
                                <tr style={{ border: '1px solid black' }}>
                                    <td style={{ border: '1px solid black ' }}>{i + 1}</td>
                                    <td style={{ border: '1px solid black ' }}>{item.name}</td>
                                    <td style={{ border: '1px solid black ' }}>{item.surname}</td>
                                    <td style={{ border: '1px solid black ' }}>{item.number}</td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>
        </div >
    )
}
