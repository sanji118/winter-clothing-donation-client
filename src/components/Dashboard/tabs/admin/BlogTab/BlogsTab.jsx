import React, { useMemo, useState } from "react";
import  {DataGrid}  from "react-data-grid";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit2, Trash2, Plus } from "lucide-react";
import {
  getBlogs,
  deleteBlog,
  updateBlog,
  createBlog,
} from "../../../../../services/blogService";
import Swal from "sweetalert2";
import Searchbar from "../../../../Searchbar";
import { Button } from "@heroui/react";
import BlogFormModal from "./BlogFormModal";



export default function BlogsTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  const createMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      setIsModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, blogData }) => updateBlog(id, blogData),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = useMemo(() => [
    {
      key: 'title',
      name: 'Title',
      width: 250,
      renderCell: ({ row }) => (
        <div className="whitespace-normal break-words">{row.title}</div>
      )
    },
    { key: "slug", name: "Slug", width: 250, resizable: true },
    {
      key: "authorName",
      name: "Author",
      width: 150,
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words">{row.author?.name || "-"}</span>
      ),
    },
    {
      key: "authorAvatar",
      name: "Avatar",
      renderCell: ({ row }) =>
        row.author?.avatar ? (
          <img src={row.author.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
        ) : (
          "-"
        ),
    },
    {
      key: "authorBio",
      name: "Author Bio",
      width: 200,
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words">{row.author?.bio || "-"}</span>
      ),
    },
    {
      key: "authorSocial",
      name: "Social",
      width: 250,
      renderCell: ({ row }) => {
        const socials = row.author?.social || {};

        const socialKeys = Object.keys(socials);

        if (socialKeys.length === 0) {
          return <span className="text-gray-400">-</span>;
        }

        return (
          <div className="whitespace-normal break-words text-sm space-y-1">
            {socialKeys.map((platform) => (
              <p key={platform}>
                <span className="capitalize font-medium text-blue-600">{platform}:</span>{" "}
                <span className="text-gray-700 break-all">{socials[platform]}</span>
              </p>
            ))}
          </div>
        );
      },
    },

    {
      key: "date",
      name: "Date",
      renderCell: ({ row }) => <span>{new Date(row.date).toLocaleDateString()}</span>,
    },
    {
      key: "updatedDate",
      name: "Updated",
      renderCell: ({ row }) => <span>{new Date(row.updatedDate).toLocaleDateString()}</span>,
    },
    {
      key: "image",
      name: "Image",
      renderCell: ({ row }) => (
        <img src={row.image} alt="blog" className="w-14 h-10 object-cover rounded" />
      ),
    },
    {
      key: "content",
      name: "Content",
      width: 250,
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words max-w-xs text-xs text-gray-700">
          {row.content}
        </span>
      ),
    },
    {
      key: "excerpt",
      name: "Excerpt",
      width: 200,
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words max-w-xs">
          {row.excerpt}
        </span>
      ),
    },
    {
      key: "categories",
      name: "Categories",
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words">{row.categories?.join(", ") || "-"}</span>
      ),
    },
    {
      key: "tags",
      name: "Tags",
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words">{row.tags?.join(", ") || "-"}</span>
      ),
    },
    {
      key: "comments",
      name: "Comments",
      renderCell: ({ row }) => <span>{row.comments?.length || 0}</span>,
    },
    {
      key: "views",
      name: "Views",
      renderCell: ({ row }) => <span>{row.views ?? 0}</span>,
    },
    {
      key: "likes",
      name: "Likes",
      renderCell: ({ row }) => <span>{row.likes ?? 0}</span>,
    },
    {
      key: "readingTime",
      name: "Reading (min)",
      renderCell: ({ row }) => <span>{row.readingTime || 0}</span>,
    },
    {
      key: "featured",
      name: "Featured",
      renderCell: ({ row }) =>
        row.featured ? (
          <span className="text-green-600 font-semibold">Yes</span>
        ) : (
          <span className="text-gray-400">No</span>
        ),
    },
    {
      key: "metaDescription",
      name: "Meta Description",
      width: 200,
      renderCell: ({ row }) => (
        <span className="whitespace-normal break-words max-w-xs text-sm text-gray-600">
          {row.metaDescription}
        </span>
      ),
    },
    {
      key: "actions",
      name: "Actions",
      renderCell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              setSelectedBlog(row);
              setIsModalOpen(true);
            }}
            className="btn btn-xs btn-warning"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() =>
              Swal.fire({
                title: "Delete this blog?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
              }).then((res) => {
                if (res.isConfirmed) deleteMutation.mutate(row._id);
              })
            }
            className="btn btn-xs btn-error"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ], []);



  return (
    <div className=" bg-purple-100 border-l-2 border-purple-400 min-h-screen overflow-y-auto shadow-sm ">
      <div  className='w-full text-center p-6'>
        <div>
          <h2 className="text-2xl font-semibold text-cyan-700">Blog Management</h2>
          <p className="text-gray-600">Manage all blogs</p>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-10 mt-5'>
          <Searchbar
            onSearch={(value) => setSearchTerm(value)}
            placeholder="Search by blog title"
            className='w-3/5'
          />
          <Button className='bg-cyan-500 text-white' onClick={() => {
            setSelectedBlog(defaultBlog);
            setIsModalOpen(true);
          }} startContent={<Plus />}>Create Campaign</Button>
        </div>
        
      </div>

      <div className="mt-4 p-1">
        <DataGrid
          columns={columns}
          rows={filteredBlogs}
          rowHeight={100}
          className="rdg-light rounded"
          style={{
            height: 'auto',
            textAlign: 'center',
            '--rdg-header-background-color': '#F4DBFF',
            '--rdg-header-color': '#ede9fe',
            '--rdg-background-color': '#faf5ff',
          }}
        />
      </div>

      {isModalOpen && 
        <BlogFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedBlog={selectedBlog}
        />

      }
    </div>
  );
}
