import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getUsers, 
  updateUserRole, 
  deleteUser 
} from "../../../../services/userService";
import { getDonations } from "../../../../services/donationService";
import {DataGrid} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { 
  LucideEdit, 
  LucideTrash2, 
  LucideCheck, 
  LucideX, 
  LucideUser,
  LucideFilter,
  LucideRefreshCw
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const roles = [
  { label: "All Users", value: "" },
  { label: "Admins", value: "admin"},
  { label: "Partners", value: "partner"},
  { label: "Regular Users", value: "user"},
  { label: "Volunteers", value: "volunteer" },
];

export default function UsersTab() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const { data: users = [], isLoading: usersLoading, refetch: refetchUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const { data: donations = [], isLoading: donationsLoading, refetch: refetchDonations } = useQuery({
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
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteMutation.mutateAsync(id);
        Swal.fire(
          "Deleted!",
          "The user has been deleted.",
          "success"
        );
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the user.",
          "error"
        );
      }
    }
  };

  const handleRefresh = async () => {
    await Promise.all([refetchUsers(), refetchDonations()]);
    toast.success('Data refreshed successfully');
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
              <img src={row.photo} alt={row.name} className="object-cover" />
            ) : (
              <div className="bg-gradient-to-br from-pink-200 to-cyan-200 w-full h-full flex items-center justify-center">
                <LucideUser className="text-gray-600" />
              </div>
            )}
          </div>
        </div>
      )
    },
    { 
      key: 'name', 
      name: 'Name', 
      width: 150,
      renderCell: ({ row }) => <span className="font-medium">{row.name}</span>
    },
    { 
      key: 'email', 
      name: 'Email', 
      width: 200,
      renderCell: ({ row }) => <span className="text-sm text-gray-600">{row.email}</span>
    },
    { 
      key: 'phone', 
      name: 'Phone', 
      width: 150,
      renderCell: ({ row }) => <span className="text-sm">{row.phone || 'N/A'}</span>
    },
    { 
      key: 'joined', 
      name: 'Joined', 
      width: 120,
      renderCell: ({ row }) => <span className="text-sm">{new Date(row.createdAt).toLocaleDateString()}</span>
    },
    { 
      key: 'donationAmount', 
      name: 'Donation', 
      width: 120,
      renderCell: ({ row }) => (
        <span className="font-semibold text-green-600">
          ৳{calculateDonationAmount(row.email).toLocaleString()}
        </span>
      )
    },
    {
      key: 'role',
      name: 'Role',
      width: 150,
      renderCell: ({ row }) => {
        if (editingId === row._id) {
          return (
            <select
              className="select select-bordered select-sm w-full max-w-xs bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
            >
              {roles.filter(r => r.value).map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          );
        }
        const roleInfo = roles.find(r => r.value === row.role);
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.role === 'admin' ? 'bg-purple-100 text-purple-800' :
            row.role === 'partner' ? 'bg-blue-100 text-blue-800' :
            row.role === 'volunteer' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {roleInfo?.label || row.role}
          </span>
        );
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
                className="btn btn-sm btn-circle bg-green-500 hover:bg-green-600 text-white"
                onClick={() => roleMutation.mutate({ id: row._id, role: newRole })}
              >
                <LucideCheck size={16} />
              </button>
              <button
                className="btn btn-sm btn-circle bg-red-500 hover:bg-red-600 text-white"
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
              className="btn btn-sm btn-circle btn-primary hover:bg-cyan-600"
              onClick={() => {
                setEditingId(row._id);
                setNewRole(row.role);
              }}
            >
              <LucideEdit size={16} />
            </button>
            <button
              className="btn btn-sm btn-circle btn-error hover:bg-red-600"
              onClick={() => handleDelete(row._id)}
            >
              <LucideTrash2 size={16} />
            </button>
          </div>
        );
      }
    }
  ];

  const filteredUsers = selectedRole
    ? users.filter(user => user.role === selectedRole)
    : users;

  const rows = filteredUsers.map(user => ({
    ...user,
    donationAmount: calculateDonationAmount(user.email)
  }));

  if (usersLoading || donationsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-fuchsia-50 border-l-2 border-pink-300 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-cyan-700 mb-2">User Management</h1>
            
            {/* Filter Section */}
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center">
                  <LucideFilter className="text-cyan-600 mr-2" size={20} />
                  <span className="text-sm font-medium text-gray-700">Filter Options</span>
                </div>
                
                <div className="relative w-full sm:w-64">
                  <select
                    className="select select-bordered w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    {roles.map(role => (
                      <option key={role.value} value={role.value}>
                         {role.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LucideUser className="text-gray-400" size={16} />
                  </div>
                </div>
                
                <button
                  onClick={handleRefresh}
                  className="btn btn-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2"
                >
                  <LucideRefreshCw size={16} className={usersLoading || donationsLoading ? 'animate-spin' : ''} />
                  Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="stat">
                <div className="stat-title text-gray-600">Total Users</div>
                <div className="stat-value text-cyan-600">{users.length}</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="stat">
                <div className="stat-title text-gray-600">Total Donations</div>
                <div className="stat-value text-green-600">
                  ৳{donations
                    ?.filter(d => d.paymentstatus === 'success')
                    ?.reduce((sum, d) => sum + (d.amount || 0), 0)
                    ?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DataGrid */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <DataGrid
            columns={columns}
            rows={rows}
            rowHeight={60}
            className="rdg-light"
            style={{ 
              height: 'calc(100vh - 220px)',
              '--rdg-background-color': 'white',
              '--rdg-color': '#1f2937',
              '--rdg-border-color': '#e5e7eb'
            }}
          />
        </div>
      </div>
    </div>
  );
}