import { useState } from "react";

export default function ComponentPage(){
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const fetchComments = async() => {
        const response = await fetch('/api/comments');
        const data = await response.json();
        setComments(data);
    }

    const submitComment = async() =>{
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({comment}),
            headers: {
                'Content-Type': 'application/json'
            },
            
        });
        console.log();
    }

    return (
        <>
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
            <button onClick={submitComment}>Submit Comment</button>
            <button onClick={fetchComments}>Load Comments</button>
            <a>.env variables : {process.env.MONGODB_URI}</a>
            {comments.map(comment => {
                return (
                    <div key={comment['id']}>
                        {comment['id']} {comment['text']}
                    </div>
                )
            })}
        </>
    )
}