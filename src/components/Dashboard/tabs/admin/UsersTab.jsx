import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getUsers, 
  updateUserRole, 
  deleteUser 
} from "../../../../services/userService";
import { getDonations } from "../../../../services/donationService";
import {DataGrid}  from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { 
  LucideEdit, 
  LucideTrash2, 
  LucideCheck, 
  LucideX, 
  LucideUser
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Partner", value: "partner" },
  { label: "User", value: "user" },
  { label: "Volunteer", value: "volunteer" },
];

export default function UsersTab() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [newRole, setNewRole] = useState('');

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const { data: donations = [], isLoading: donationsLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User role updated successfully');
      setEditingId(null);
    },
    onError: (error) => {
      toast.error(`Error updating role: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting user: ${error.message}`);
    }
  });

  const calculateDonationAmount = (email) => {
    return donations
      ?.filter(donation => donation.email === email && donation.paymentstatus === 'success')
      ?.reduce((sum, donation) => sum + (donation.amount || 0), 0) || 0;
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns = [
    {
      key: 'photo',
      name: 'Profile',
      width: 70,
      renderCell: ({ row }) => (
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            {row.photo ? (
              <img src={row.photo} alt={row.name} />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                <LucideUser className="text-gray-500" />
              </div>
            )}
          </div>
        </div>
      )
    },
    { 
      key: 'name', 
      name: 'Name', 
      width: 150 
    },
    { 
      key: 'email', 
      name: 'Email', 
      width: 200 
    },
    { 
      key: 'phone', 
      name: 'Phone', 
      width: 150 
    },
    { 
      key: 'joined', 
      name: 'Joined', 
      width: 120 
    },
    { 
      key: 'donationAmount', 
      name: 'Donation', 
      width: 120,
      renderCell: ({ row }) => `৳${calculateDonationAmount(row.email).toLocaleString()}`
    },
    {
      key: 'role',
      name: 'Role',
      width: 150,
      renderCell: ({ row }) => {
        if (editingId === row._id) {
          return (
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          );
        }
        return roles.find(r => r.value === row.role)?.label || row.role;
      }
    },
    {
      key: 'actions',
      name: 'Actions',
      width: 120,
      renderCell: ({ row }) => {
        if (editingId === row._id) {
          return (
            <div className="flex gap-2">
              <button
                className="btn "
                onClick={() => roleMutation.mutate({ id: row._id, role: newRole })}
              >
                <LucideCheck size={16} className="bg-blue-500"/>
              </button>
              <button
                className="btn bg-red-600 text-white"
                onClick={() => setEditingId(null)}
              >
                <LucideX size={16} />
              </button>
            </div>
          );
        }
        return (
          <div className="flex gap-2">
            <button
              className="btn btn-circle btn-sm btn-primary"
              onClick={() => {
                setEditingId(row._id);
                setNewRole(row.role);
              }}
            >
              <LucideEdit size={16} />
            </button>
            <button
              className="btn btn-circle btn-sm btn-error"
              onClick={() => handleDelete(row._id)}
            >
              <LucideTrash2 size={16} />
            </button>
          </div>
        );
      }
    }
  ];

  const rows = users.map(user => ({
    ...user,
    donationAmount: calculateDonationAmount(user.email)
  }));

  if (usersLoading || donationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-pink-50 border-l-2 border-pink-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-800">User Management</h2>
        <div className="stats shadow-lg border border-pink-200">
          <div className="stat">
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{users.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Donations</div>
            <div className="stat-value">৳{donations
              ?.filter(d => d.paymentstatus === 'success')
              ?.reduce((sum, d) => sum + (d.amount || 0), 0)
              ?.toLocaleString() || 0}</div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-lg shadow">
        <DataGrid
          columns={columns}
          rows={rows}
          rowHeight={60}
          className="rdg-light rounded-lg"
          style={{ height: 'calc(100vh - 200px)' }}
        />
      </div>
    </div>
  );
}