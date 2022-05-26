import axios from "axios";
import { useRef, useState } from "react"

function Create({ fetchAll, BASEURL }) {
    const [ok, setOk] = useState(false)
    const title = useRef(null)
    const content = useRef(null)

    function handleSubmit(e) {
        e.preventDefault()
        const obj = {
            title: title.current.value,
            content: content.current.value,
        }

        axios.post(`${BASEURL}index.php`, obj)
            .then((response) => {
                if (response.data.ok === "posted") {
                    setOk(true)
                    fetchAll()
                    setTimeout(() => {
                        setOk(false)
                        title.current.value = ""
                        content.current.value = ""
                    }, 3000)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <form onSubmit={handleSubmit} className="create_form">
            <input ref={title} type="text" placeholder="タイトル" required />
            <textarea ref={content} wrap="off" placeholder="内容" required />
            <button>新規入力</button>
            <button type="reset">クリア</button>
            <div className="result">{ok ? "追加しました" : ""}</div>
        </form>
    )
}

export default Create