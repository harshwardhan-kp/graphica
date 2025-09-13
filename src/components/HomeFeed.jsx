import React from 'react';
import { FEED_POSTS } from '../data/feed';
import { clubImageSrc } from '../data/clubs.js';

function handleFromName(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '').replace(/^_+|_+$/g, '');
}

function PostCard({ post }) {
  const avatar = clubImageSrc(post.club);
  return (
    <article className="post-card">
      <header className="post-head">
        <img className="post-avatar" src={avatar} alt={`${post.club} profile`} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <div className="post-head-text">
          <h3 className="post-club">{post.club}</h3>
          <span className="post-handle">@{handleFromName(post.club)}</span>
        </div>
      </header>
      <div className="post-media">
        {post.type === 'image' ? (
          <img src={post.url} alt={`${post.club} post`} />
        ) : (
          <video src={post.url} controls playsInline preload="metadata" />
        )}
      </div>
    </article>
  );
}

export default function HomeFeed() {
  return (
    <section className="home-feed">
      {FEED_POSTS.map((p, i) => (
        <PostCard key={`${p.path}-${i}`} post={p} />
      ))}
    </section>
  );
}
