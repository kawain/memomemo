import axios from 'axios'
import { useEffect, useState } from "react"
import Create from "./components/Create"
import Posts from "./components/Posts"

const BASEURL = process.env.REACT_APP_API_URL

function App() {
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)

  function fetchAll() {
    axios.get(`${BASEURL}index.php`)
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
      <h1><span className='c1'>メ</span><span className='c2'>モ</span><span className='c3'>メ</span><span className='c4'>モ</span></h1>

      <div className='addbtn'>
        <button onClick={() => setOpen(!open)}>{open ? "新規入力画面(閉じる)" : "新規入力画面(開く)"}</button>
      </div>

      <div className='create'>
        {open ? <Create fetchAll={fetchAll} BASEURL={BASEURL} /> : null}
      </div>

      <div className='posts'>
        <Posts fetchAll={fetchAll} posts={posts} setPosts={setPosts} BASEURL={BASEURL} />
      </div>
    </div>
  )
}

export default App
