import { useState } from "react";
import { likeArticle, dislikeArticle, blockArticle } from "../../../api/endpoints/article";
import type { IArticleDTO } from "../../../types/dtos/article";
import toast from "react-hot-toast";

export const useArticleReactions = (
  article: IArticleDTO,
  setArticle: (updated: IArticleDTO) => void,
  userId?: string 
) => {
  const [loading, setLoading] = useState(false);

  const handleReaction = async (type: "like" | "dislike" | "block") => {
    if (loading) return;

    if (!userId) {
      toast.error("You must be logged in to react to an article.");
      return; // Stop execution if userId is not present
    }

    setLoading(true);

    const updated: IArticleDTO  = { ...article };

    // --- helpers ---
    const liked = updated.likedBy?.includes(userId) ?? false;
    const disliked = updated.dislikedBy?.includes(userId) ?? false;
    const blocked = updated.blockedBy?.includes(userId) ?? false;

    try {
      // ---------------- LIKE ----------------
      if (type === "like") {
        if (liked) {
          // remove like
          updated.likedBy = updated.likedBy!.filter(id => id !== userId);
          updated.likes--;
        } else {
          // add like
          updated.likedBy = [...(updated.likedBy || []), userId];
          updated.likes++;

          // remove dislike if it was active
          if (disliked) {
            updated.dislikedBy = updated.dislikedBy!.filter(id => id !== userId);
            updated.dislikes--;
          }
        }

        setArticle(updated);        // instant UI update
        await likeArticle(article.id); // backend sync
      }

      // ---------------- DISLIKE ----------------
      if (type === "dislike") {
        if (disliked) {
          updated.dislikedBy = updated.dislikedBy!.filter(id => id !== userId);
          updated.dislikes--;
        } else {
          updated.dislikedBy = [...(updated.dislikedBy || []), userId];
          updated.dislikes++;

          if (liked) {
            updated.likedBy = updated.likedBy!.filter(id => id !== userId);
            updated.likes--;
          }
        }

        setArticle(updated);
        await dislikeArticle(article.id);
      }

      // ---------------- BLOCK ----------------
      if (type === "block") {
        if (blocked) {
          updated.blockedBy = updated.blockedBy!.filter(id => id !== userId);
          updated.blocks--;
        } else {
          updated.blockedBy = [...(updated.blockedBy || []), userId];
          updated.blocks++;
        }

        setArticle(updated);
        await blockArticle(article.id);
      }

    } catch (err) {
      console.error("Reaction update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleReaction };
};
