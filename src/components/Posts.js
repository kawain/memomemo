
// <div key={i} dangerouslySetInnerHTML={{ __html: v.title }} />
import axios from 'axios'
import { useState } from "react";
import { FiExternalLink, FiEdit, FiDelete } from "react-icons/fi";

function Posts({ fetchAll, posts, BASEURL }) {
    const [id, setId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [mode, setMode] = useState(0)


    function selectOne(id, modeNo) {
        if (modeNo === 1) {
            setMode(1)
        } else if (modeNo === 2) {
            setMode(2)
        }

        axios.get(`${BASEURL}index.php?id=${id}`)
            .then(res => {
                setId(res.data.id)
                setTitle(res.data.title)
                setContent(res.data.content)
            }).catch(error => {
                console.log(error)
            })
    }

    function deleteOne(id) {
        let result = window.confirm("本当に削除していいですか？")
        if (result) {
            axios.delete(`${BASEURL}`, { data: { id: id } })
                .then(res => {
                    if (res.data.ok === "deleted") {
                        fetchAll()
                    }
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    function handleEdit(e) {
        e.preventDefault()

        const obj = {
            id: id,
            title: title,
            content: content,
        }

        axios.put(`${BASEURL}`, obj)
            .then((response) => {
                if (response.data.ok === "updated") {
                    fetchAll()
                    setMode(1)
                }
            })
            .catch((error) => {
                console.log('ERROR!! occurred in Backend.', error)
            })
    }


    if (mode === 1) {
        return (
            <>
                <h2>{id}:{title}</h2>
                <pre>{content}</pre>
                <div className='close'>
                    <button onClick={() => setMode(0)}>閉じる</button>
                </div>
            </>
        )
    } else if (mode === 2) {
        return (
            <>
                <form onSubmit={handleEdit} className="create_form">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <textarea wrap="off" value={content} onChange={(e) => setContent(e.target.value)} />
                    <button>修正</button>
                </form>
                <div className='close'>
                    <button onClick={() => setMode(0)}>閉じる</button>
                </div>
            </>
        )
    }

    return (
        <>
            <h2>一覧</h2>
            <table className="list">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>タイトル</th>
                        <th>開く</th>
                        <th>編集</th>
                        <th>削除</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((v, i) => {
                        return (
                            <tr key={i}>
                                <td className="td1">{v.id}</td>
                                <td>{v.title}</td>
                                <td className="td3" onClick={() => selectOne(v.id, 1)}><FiExternalLink /></td>
                                <td className="td3" onClick={() => selectOne(v.id, 2)}><FiEdit /></td>
                                <td className="td3" onClick={() => deleteOne(v.id)}><FiDelete /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Posts