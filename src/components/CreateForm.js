import axios from "axios";
import { useEffect, useRef, useState } from "react"


function CreateForm({ BASEURL }) {

    const [ok, setOk] = useState(false)

    const title = useRef(null)
    const content = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()

        const obj = {
            title: title.current.value,
            content: content.current.value,
        }

        axios.post(`${BASEURL}`, obj)
            .then((response) => {
                if (response.data.ok === "posted") {
                    setOk(true)
                }
                console.log(response.data)
            })
            .catch((error) => {
                console.log('ERROR!! occurred in Backend.', error)
            })
    }

    useEffect(() => {
        const id = setTimeout(() => {
            setOk(false)
            title.current.value = ""
            content.current.value = ""
        }, 3000)
        return () => {
            clearTimeout(id)
        }
    }, [ok])

    return (
        <form onSubmit={handleSubmit} className="create_form">
            <input ref={title} type="text" placeholder="タイトル" required />
            <textarea ref={content} placeholder="内容" required></textarea>
            <button>新規入力</button>
            <button type="reset">クリア</button>
            {ok ? "追加しました" : null}
        </form>
    )
}

export default CreateForm