import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getDonations, 
  updateDonation, 
  deleteDonation 
} from "../../../../services/donationService";
import {DataGrid} from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { 
  LucideEdit, 
  LucideTrash2, 
  LucideCheck, 
  LucideX,
  LucideFilter,
  LucideSearch,
  LucideRefreshCw,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { getCampaigns } from "../../../../services/campaignService";
import Searchbar from "../../../Searchbar";

const paymentStatuses = [
  { label: "Success", value: "success" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

export default function DonationTab() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [editedDonation, setEditedDonation] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ['donations'],
    queryFn: getDonations
  });

  const { data : campaigns = []} = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateDonation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['donations']);
      toast.success('Donation updated successfully');
      setEditingId(null);
    },
    onError: (error) => {
      toast.error(`Error updating donation: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteDonation,
    onSuccess: () => {
      queryClient.invalidateQueries(['donations']);
      toast.success('Donation deleted successfully');
    },
    onError: (error) => {
      toast.error(`Error deleting donation: ${error.message}`);
    }
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleUpdate = (id) => {
    updateMutation.mutate({ id, data: editedDonation });
  };

  const formatPaymentMethod = (donation) => {
    if (!donation.card_brand && !donation.card_issuer) {
      return donation.method || 'Unknown';
    }
    
    if (donation.card_brand === 'MOBILEBANKING') {
      return donation.card_issuer;
    }
    return `${donation.card_issuer} via ${donation.card_brand} card`;
  };

  

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = 
      donation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || donation.paymentstatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { 
      key: 'date', 
      name: 'Date', 
      width: 150,
      renderCell: ({ row }) => new Date(row.date).toLocaleDateString()
    },
    { 
      key: 'name', 
      name: 'Donor', 
      width: 150 
    },
    { 
      key: 'email', 
      name: 'Email', 
      width: 200 
    },
    { 
      key: 'campaignSlug', 
      name: 'Campaign', 
      width: 300,
      renderCell: ({ row }) => (
        <span className="badge badge-ghost">
          {campaigns.map(campaign => campaign.slug === row.campaignSlug && campaign.title )}
        </span>
      )
    },
    { 
      key: 'amount', 
      name: 'Amount', 
      width: 120,
      renderCell: ({ row }) => `৳${row.amount?.toLocaleString()}` 
    },
    {
      key: 'method',
      name: 'Payment Method',
      width: 250,
      renderCell: ({ row }) => {
        const method = formatPaymentMethod(row);
        return (
          <div className="flex items-center gap-2">
            
            <span>{method}</span>
          </div>
        );
      }
    },
    {
      key: 'paymentstatus',
      name: 'Status',
      width: 120,
      renderCell: ({ row }) => {
        if (editingId === row._id) {
          return (
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={editedDonation.paymentstatus || row.paymentstatus}
              onChange={(e) => setEditedDonation({...editedDonation, paymentstatus: e.target.value})}
            >
              {paymentStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          );
        }
        const status = paymentStatuses.find(s => s.value === row.paymentstatus);
        return (
          <span className={`badge ${row.paymentstatus === 'success' ? 'badge-success' : 
            row.paymentstatus === 'pending' ? 'badge-warning' : 
            'badge-error'}`}>
            {status?.label || row.paymentstatus}
          </span>
        );
      }
    },
    { 
      key: 'transactionId', 
      name: 'Transaction ID', 
      width: 200 
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
                className="btn btn-circle btn-sm btn-success"
                onClick={() => handleUpdate(row._id)}
              >
                <LucideCheck size={16} />
              </button>
              <button
                className="btn btn-circle btn-sm btn-error"
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
                setEditedDonation({
                  paymentstatus: row.paymentstatus
                });
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const totalAmount = filteredDonations
    .filter(d => d.paymentstatus === 'success')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="p-6 bg-amber-50 border-l-2 border-amber-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-700">Donation Management</h2>
        <div className="stats shadow-lg overflow-hidden text-yellow-500 border border-amber-200">
          <div className="stat">
            <div className="stat-title">Total Donations</div>
            <div className="stat-value">{filteredDonations.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Amount</div>
            <div className="stat-value">৳{totalAmount.toLocaleString()}</div>
          </div>
          <div className="stat">
            <button 
              className="btn btn-ghost"
              onClick={() => refetch()}
            >
              <LucideRefreshCw size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-base-100 p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Searchbar onSearch={(value) => setSearchTerm(value)} placeholder="Search by name, email or transaction ID"  className="w-full md:max-w-md"/>
          
          <div className="form-control">
            <div className="input-group">
              <select
                className="select select-bordered"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {paymentStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-100 rounded-lg shadow">
        <DataGrid
          columns={columns}
          rows={filteredDonations}
          rowHeight={60}
          className="rdg-light rounded-lg"
          style={{
            height: 'calc(100vh - 100px)',
            '--rdg-header-background-color': '#fef9c3',
            '--rdg-header-color': '#92400e',
            '--rdg-header-font-weight': '600',
            '--rdg-background-color': '#fffef5',
          }}
        />
      </div>
    </div>
  );
}