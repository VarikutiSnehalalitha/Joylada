'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { StorageService } from '@/services/storage';
import { Comment } from '@/types';
import { Heart, MessageSquare, Send, CornerDownRight, ShieldCheck, Flag } from 'lucide-react';

interface CommentSectionProps {
  storyId: string;
  chapterId?: string;
  chapterNumber?: number;
  onReportComment?: (commentId: string, commentSnippet: string) => void;
}

export default function CommentSection({
  storyId,
  chapterId,
  chapterNumber,
  onReportComment
}: CommentSectionProps) {
  const { currentUser } = useApp();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [likedCommentIds, setLikedCommentIds] = useState<string[]>([]);

  const loadComments = () => {
    const list = StorageService.getComments(storyId, chapterId);
    setComments(list);
  };

  useEffect(() => {
    loadComments();
    const handleStorage = () => loadComments();
    window.addEventListener('velumbra_storage_change', handleStorage);
    return () => window.removeEventListener('velumbra_storage_change', handleStorage);
  }, [storyId, chapterId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    StorageService.addComment(storyId, newCommentText.trim(), chapterId, chapterNumber);
    setNewCommentText('');
    loadComments();
  };

  const handleToggleLikeComment = (commentId: string) => {
    setLikedCommentIds((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" />
          <h3 className="font-serif text-xl font-bold text-ink-900 dark:text-ink-50">
            Discussion & Insights ({comments.length})
          </h3>
        </div>
      </div>

      {/* Input box */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="p-3 rounded-2xl border border-border/80 bg-card focus-within:border-amber-500 transition-colors shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-500/40"
            />
            <span className="text-xs font-semibold text-ink-800 dark:text-ink-200">
              {currentUser.name}
            </span>
            <span className="text-[10px] text-ink-400 capitalize">({currentUser.role})</span>
          </div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={
              chapterNumber
                ? `Share your thoughts on Chapter ${chapterNumber}...`
                : "Leave an editorial review or reflection on this story..."
            }
            rows={3}
            className="w-full bg-transparent text-xs text-ink-900 dark:text-ink-100 placeholder:text-ink-400 focus:outline-none resize-none leading-relaxed"
          />
          <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-2">
            <span className="text-[10px] text-ink-400">
              Be respectful and constructive in literary discussions.
            </span>
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-ink-950 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Comment</span>
            </button>
          </div>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="py-10 text-center border border-dashed border-border/70 rounded-2xl bg-card/30">
            <MessageSquare className="w-8 h-8 text-ink-400 mx-auto mb-2 opacity-50" />
            <p className="text-xs text-ink-500">
              No comments yet. Be the first to share your literary reflection!
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const isLiked = likedCommentIds.includes(comment.id);
            return (
              <div
                key={comment.id}
                className="p-4 rounded-xl border border-border/60 bg-card/50 space-y-2.5 transition-colors"
              >
                {/* Comment header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-border"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-ink-900 dark:text-ink-100">
                          {comment.user.name}
                        </span>
                        {comment.user.role === 'author' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                            <ShieldCheck className="w-3 h-3" /> Author
                          </span>
                        )}
                        {comment.chapterNumber && (
                          <span className="text-[10px] text-amber-500/80 font-medium">
                            · Ch. {comment.chapterNumber}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-ink-400">
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>
                  </div>

                  {onReportComment && (
                    <button
                      onClick={() => onReportComment(comment.id, comment.content)}
                      className="text-ink-400 hover:text-rose-500 p-1 rounded transition-colors"
                      title="Report comment"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Comment body */}
                <p className="text-xs text-ink-700 dark:text-ink-200 leading-relaxed pl-9.5">
                  {comment.content}
                </p>

                {/* Comment actions */}
                <div className="flex items-center gap-4 pl-9.5 text-xs text-ink-400 pt-1">
                  <button
                    onClick={() => handleToggleLikeComment(comment.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      isLiked ? 'text-rose-500 font-semibold' : 'hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{comment.likes + (isLiked ? 1 : 0)}</span>
                  </button>

                  <button
                    onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                    className="hover:text-amber-500 transition-colors flex items-center gap-1"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    <span>Reply</span>
                  </button>
                </div>

                {/* Nested replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-6 space-y-3 border-l-2 border-border/60 ml-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="p-2.5 rounded-lg bg-ink-100/40 dark:bg-ink-900/40 space-y-1">
                        <div className="flex items-center gap-2">
                          <img
                            src={reply.user.avatar}
                            alt={reply.user.name}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="font-semibold text-[11px] text-ink-900 dark:text-ink-100">
                            {reply.user.name}
                          </span>
                          {reply.user.role === 'author' && (
                            <span className="text-[9px] font-semibold text-amber-500">
                              (Author)
                            </span>
                          )}
                          <span className="text-[10px] text-ink-400">
                            {formatDate(reply.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-ink-600 dark:text-ink-300 pl-7 leading-relaxed">
                          {reply.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
