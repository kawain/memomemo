
function PostsList({ posts }) {
    return (
        <div>
            {posts.map((v, i) => {
                return <div key={i} dangerouslySetInnerHTML={{ __html: v.title }} />
            })}
        </div>
    )
}

export default PostsList