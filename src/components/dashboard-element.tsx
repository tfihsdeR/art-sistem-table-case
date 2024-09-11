import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

interface Post {
    userId: number;
    id: number;
    title: string;
}

interface UserGroup {
    userId: number;
    titleCount: number;
}

const DashboardElement: React.FC = () => {
    const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
    const [userIdSortConfig, setUserIdSortConfig] = useState<{ key: string; direction: string }>({ key: 'userId', direction: 'asc' });
    const [titleCountSortConfig, setTitleCountSortConfig] = useState<{ key: string; direction: string }>({ key: 'titleCount', direction: 'asc' });

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
            groupByUserId(response.data);
        });
    }, []);

    const groupByUserId = (posts: Post[]) => {
        const grouped: { [key: number]: UserGroup } = {};
        posts.forEach((post) => {
            if (!grouped[post.userId]) {
                grouped[post.userId] = { userId: post.userId, titleCount: 0 };
            }
            grouped[post.userId].titleCount += 1;
        });
        setUserGroups(Object.values(grouped));
    };

    const sortTable = (key: string, config: { key: string; direction: string }, setConfig: React.Dispatch<React.SetStateAction<{ key: string; direction: string }>>) => {
        let direction = 'asc';
        if (config.key === key && config.direction === 'asc') {
            direction = 'desc';
        }
        const sortedData = [...userGroups].sort((a, b) => {
            if (a[key as keyof UserGroup] < b[key as keyof UserGroup]) return direction === 'asc' ? -1 : 1;
            if (a[key as keyof UserGroup] > b[key as keyof UserGroup]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setUserGroups(sortedData);
        setConfig({ key, direction });
    };

    return (
        <div>
            <h1>Post List</h1>
            <Table striped bordered hover className="table-dark">
                <thead>
                    <tr>
                        <th onClick={() => sortTable('userId', userIdSortConfig, setUserIdSortConfig)}>User ID {userIdSortConfig.direction === 'asc' ? '↑' : '↓'}</th>
                        <th onClick={() => sortTable('titleCount', titleCountSortConfig, setTitleCountSortConfig)}>
                            Title Count {titleCountSortConfig.direction === 'asc' ? '↑' : '↓'}
                        </th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {userGroups.map((group) => (
                        <tr key={group.userId}>
                            <td>{group.userId}</td>
                            <td>{group.titleCount}</td>
                            <td>
                                <Link to={`/postDetails/${group.userId}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DashboardElement;
