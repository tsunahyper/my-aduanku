import React, { useState, useEffect } from 'react'
import { XMarkIcon, PencilIcon, TrashIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { decodeToken } from '../../../utils/commonUtils'
import { 
  getCommentsByIssue, 
  createComment, 
  updateComment, 
  deleteComment, 
  toggleCommentLike 
} from '../../../api/comments'

interface CommentsModalProps {
  issueId: string
  issueName: string
  onClose: () => void
}

interface Comment {
  _id: string
  text: string
  author: {
    _id: string
    name: string
    email: string
  }
  likes: Array<{
    user: string
    likedAt: string
  }>
  likeCount: number
  createdAt: string
  updatedAt: string
  isEdited: boolean
}

const CommentsModal = ({ issueId, issueName, onClose }: CommentsModalProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Get current user ID from token
  const getCurrentUserId = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const decoded = decodeToken(token)
      return decoded.id || decoded._id || decoded.userId
    } catch {
      return null
    }
  }
  
  const currentUserId = getCurrentUserId()

  useEffect(() => {
    fetchComments()
  }, [issueId])

  const fetchComments = async () => {
    setLoading(true)
    try {
      const response = await getCommentsByIssue(issueId)
      if (response.success) {
        setComments(response.data.comments || [])
      } else {
        toast.error(response.message || 'Failed to load comments')
      }
    } catch (error) {
      console.error('Error fetching comments:', error)
      toast.error('Failed to load comments')
    } finally {
      setLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty')
      return
    }

    setSubmitting(true)
    try {
      const response = await createComment(issueId, newComment)
      if (response.success) {
        toast.success('Comment added successfully')
        setNewComment('')
        fetchComments()
      } else {
        toast.error(response.message || 'Failed to add comment')
      }
    } catch (error) {
      console.error('Error adding comment:', error)
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) {
      toast.error('Comment cannot be empty')
      return
    }

    setSubmitting(true)
    try {
      const response = await updateComment(commentId, editContent)
      if (response.success) {
        toast.success('Comment updated successfully')
        setEditingCommentId(null)
        setEditContent('')
        fetchComments()
      } else {
        toast.error(response.message || 'Failed to update comment')
      }
    } catch (error) {
      console.error('Error updating comment:', error)
      toast.error('Failed to update comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return
    }

    try {
      const response = await deleteComment(commentId)
      if (response.success) {
        toast.success('Comment deleted successfully')
        fetchComments()
      } else {
        toast.error(response.message || 'Failed to delete comment')
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  const handleLikeToggle = async (commentId: string) => {
    try {
      const response = await toggleCommentLike(commentId)
      if (response.success) {
        fetchComments()
      } else {
        toast.error(response.message || 'Failed to update like')
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      toast.error('Failed to update like')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Comments</h2>
            <p className="text-sm text-gray-600 mt-1">{issueName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => {
              const isAuthor = comment.author._id === currentUserId
              const isLiked = comment.likes.some(like => like.user === currentUserId)
              const isEditing = editingCommentId === comment._id

              return (
                <div key={comment._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{comment.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                        {comment.isEdited && ' (edited)'}
                      </p>
                    </div>
                    {isAuthor && !isEditing && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment._id)
                            setEditContent(comment.text)
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditComment(comment._id)}
                          disabled={submitting}
                          className="px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingCommentId(null)
                            setEditContent('')
                          }}
                          className="px-4 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 mb-2">{comment.text}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleLikeToggle(comment._id)}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          {isLiked ? (
                            <HeartSolidIcon className="w-4 h-4 text-red-600" />
                          ) : (
                            <HeartIcon className="w-4 h-4" />
                          )}
                          <span>{comment.likeCount || comment.likes.length}</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Add Comment */}
        <div className="border-t border-gray-200 p-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleAddComment}
              disabled={submitting || !newComment.trim()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentsModal

