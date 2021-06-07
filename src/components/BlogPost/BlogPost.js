import React from 'react';

const BlogPost = ({posts}) => {
    
    return (
        <div className="border p-3 m-2">
            <h3><strong> </strong> {posts.title}</h3>
            <h5>{posts.body}</h5>
        </div>
    );
};

export default BlogPost;
// https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10