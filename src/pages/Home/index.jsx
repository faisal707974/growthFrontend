import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Index() {

    const [page, setPage] = useState(1)
    const [url, setUrl] = useState('')
    const [urlError, setUrlError] = useState('')
    const [data, setData] = useState([])
    const [details, setDetails] = useState({})
    const [notification, setNotification] = useState('')

    const baseurl = 'https://wild-red-bull-shoe.cyclic.app/'

    useEffect(() => {
        axios.get(baseurl + 'listInsights').then((res) => {
            setData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [page, notification])

    async function onSubmit() {
        try {
            const res = await axios.post(baseurl + 'getInsights', { url: url })
            if (res.status === 200) {
                setDetails({ success: res.data.message, url: res.data.addedObj.Domain })
            }
        } catch (err) {
            setUrlError(err.response.data.message)
        }
    }

    async function removeInsight(id) {
        try {
            const res = await axios.delete(baseurl + 'removeInsights/' + id)
            console.log(res)
            setNotification(res.data.message)
            setTimeout(() => {
                setNotification('')
            }, 1500);
        } catch (err) {
            console.log(err)
        }
    }

    async function favInsight(id) {
        try {
            const res = await axios.patch(baseurl + 'FavInsights/' + id)
            console.log(res)
            setNotification(res.data.message)
            setTimeout(() => {
                setNotification('')
            }, 1500);
        } catch (err) {
            console.log(err)
        }
    }

    // console.log(data.data[0].WebLinks.replaceAll(" ","----"))
    return (
        <div className="WebWordCount">
            <nav>
                <button onClick={() => (setPage(1), setUrlError(''), setDetails({}))}>Webpage Scraper</button>
                <button onClick={() => (setPage(2), setUrlError(''), setDetails({}))}>Results</button>
                <p>{notification && notification}</p>
            </nav>

            {
                page === 1 &&
                <section className='webpage-scraper'>
                    <div className='input'>
                        <input onChange={(e) => (setUrl(e.target.value), setUrlError(''), setDetails({}))}
                            type="text" placeholder='Enter website url here' />
                        <p>{urlError && urlError}</p>
                    </div>
                    <button onClick={() => (onSubmit(), setUrlError(''), setDetails({}))}>Get Insights</button>
                    <div className='details'>
                        {
                            details.success &&
                            <p>
                                {details.success}
                                <br />
                                URL: {details.url}
                                <br />
                                Visit <em>'Results'</em> page for more details
                            </p>
                        }
                    </div>
                </section>
            }
            {
                page === 2 &&
                <section className='results'>
                    <table>
                        <thead>
                            <tr>
                                <th>Domain name</th>
                                <th>Word Count</th>
                                <th>Favourite</th>
                                <th>Web Links</th>
                                <th>Media Links</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.data.map((datom, i) => {
                                return <tr key={i}>
                                    <td>{datom.Domain}</td>
                                    <td>{datom.WordCount}</td>
                                    <td>{datom.Favourite ? "true" : "false"}</td>
                                    <td>
                                        {datom.WebLinks.split(" ").map((link) => {
                                            return <p>{link}</p>
                                        })}
                                    </td>
                                    <td>
                                        {datom.MediaLinks.split(" ").map((link) => {
                                            return <p>{link}</p>
                                        })}
                                    </td>
                                    <td>
                                        <em onClick={() => { removeInsight(datom.id) }}>Remove</em>
                                        <br />
                                        <em onClick={() => { favInsight(datom.id) }}>Favourite</em>
                                    </td>
                                </tr>
                            })
                            }
                        </tbody>
                    </table>
                </section>
            }
        </div>
    )
}