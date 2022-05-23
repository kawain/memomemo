import axios from 'axios'
import { useEffect, useState } from "react"
import CreateForm from "./components/CreateForm"
import PostsList from "./components/PostsList"


const BASEURL = process.env.REACT_APP_API_URL


function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)

  function fetchAll() {
    axios.get(`${BASEURL}`)
      .then(res => {
        setPosts(res.data)
      }).catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div className="container">
      <h1>メモメモ</h1>
      <button onClick={() => setOpen(!open)}>{open ? "新規入力(閉じる)" : "新規入力(開く)"}</button>
      {open ? <CreateForm BASEURL={BASEURL} /> : null}
      <h2>一覧</h2>
      <PostsList posts={posts} />
    </div>
  )
}

export default App
