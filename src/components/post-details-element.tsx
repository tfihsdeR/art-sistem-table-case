import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

const PostDetailsElement: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then((response) => setPosts(response.data));
    }, [id]);

    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()) || post.body.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <h1>Posts by User {id}</h1>
            <input type="text" placeholder="Search by title or body" value={filter} onChange={(e) => setFilter(e.target.value)} className="form-control mb-3" />

            <div className="d-flex flex-wrap justify-content-between">
                {filteredPosts.map((post) => (
                    <Card key={post.id} className="text-center mb-3" style={{ width: '48%' }} bg="secondary" text="light">
                        <Card.Header>{post.title.toUpperCase()}</Card.Header>
                        <Card.Body>
                            <Card.Text>{post.body}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PostDetailsElement;
