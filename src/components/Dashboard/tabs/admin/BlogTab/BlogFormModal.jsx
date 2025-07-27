import { useState, useEffect } from "react";
import { Textarea } from "@heroui/react";
import { createBlog, updateBlog } from "../../../../../services/blogService";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const defaultBlog = {
  title: "",
  slug: "",
  author: {
    name: "",
    avatar: "",
    bio: "",
    social: {
      twitter: "",
      facebook: ""
    }
  },
  date: "",
  updatedDate: "",
  image: "",
  content: "",
  excerpt: "",
  categories: [],
  tags: [],
  comments: [],
  views: 0,
  likes: 0,
  readingTime: "",
  featured: false,
  metaDescription: ""
};

const BlogFormModal = ({ isOpen, onClose, selectedBlog }) => {
    const queryClient = useQueryClient();
  const [formData, setFormData] = useState(defaultBlog);

  useEffect(() => {
    if (selectedBlog) {
      setFormData(selectedBlog);
    } else {
      setFormData(defaultBlog);
    }
  }, [selectedBlog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("author.social.")) {
      const socialKey = name.split(".")[2];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          social: {
            ...prev.author.social,
            [socialKey]: value
          }
        }
      }));
    } else if (name.includes("author.")) {
      const authorKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [authorKey]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBlog) {
        await updateBlog(selectedBlog._id, formData);
        toast.success("Blog updated!");
      } else {
        await createBlog(formData);
        toast.success("Blog created!");
      }
      queryClient.invalidateQueries(["blogs"])
      onClose();
      refetch();
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <dialog open={isOpen} className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box w-full max-w-4xl" onSubmit={handleSubmit}>
        <h3 className="font-bold text-xl mb-4">{selectedBlog ? "Edit Blog" : "Create Blog"}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="slug" placeholder="Slug" value={formData.slug} onChange={handleChange} className="input input-bordered w-full" />

          {/* Author Info */}
          <input type="text" name="author.name" placeholder="Author Name" value={formData.author.name} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="author.avatar" placeholder="Author Avatar URL" value={formData.author.avatar} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="author.bio" placeholder="Author Bio" value={formData.author.bio} onChange={handleChange} className="input input-bordered w-full" />

          {/* Social */}
          <input type="text" name="author.social.twitter" placeholder="Twitter" value={formData.author.social.twitter} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="author.social.facebook" placeholder="Facebook" value={formData.author.social.facebook} onChange={handleChange} className="input input-bordered w-full" />

          <input type="text" name="image" placeholder="Cover Image URL" value={formData.image} onChange={handleChange} className="input input-bordered w-full" />
          <input type="date" name="date" value={formData.date?.slice(0, 10)} onChange={handleChange} className="input input-bordered w-full" />
          <input type="date" name="updatedDate" value={formData.updatedDate?.slice(0, 10)} onChange={handleChange} className="input input-bordered w-full" />

          <input type="number" name="views" placeholder="Views" value={formData.views} onChange={handleChange} className="input input-bordered w-full" />
          <input type="number" name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="readingTime" placeholder="Reading Time (e.g. 5 min)" value={formData.readingTime} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="metaDescription" placeholder="Meta Description" value={formData.metaDescription} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <Textarea name="excerpt" placeholder="Excerpt" value={formData.excerpt} onChange={handleChange} className="textarea textarea-bordered mt-4 w-full" />
        <Textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange} className="textarea textarea-bordered mt-4 w-full" />

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <input type="text" name="categories" placeholder="Categories (comma separated)" value={formData.categories.join(", ")} onChange={(e) =>
            setFormData({ ...formData, categories: e.target.value.split(",").map(tag => tag.trim()) })
          } className="input input-bordered w-full" />

          <input type="text" name="tags" placeholder="Tags (comma separated)" value={formData.tags.join(", ")} onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(",").map(tag => tag.trim()) })
          } className="input input-bordered w-full" />
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer">
            <span className="label-text">Featured?</span>
            <input type="checkbox" className="toggle toggle-primary" checked={formData.featured} onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            } />
          </label>
        </div>

        <div className="modal-action">
          <button type="submit" className="btn btn-primary">{selectedBlog ? "Update" : "Create"}</button>
          <button type="button" className="btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </dialog>
  );
};

export default BlogFormModal;
