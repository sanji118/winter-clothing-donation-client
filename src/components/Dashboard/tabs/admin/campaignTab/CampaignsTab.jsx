import { useEffect, useMemo, useState } from 'react';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Button, Progress, Chip, Tooltip } from '@heroui/react';
import { Plus, Edit, Trash2, Info, Calendar, MapPin, User, Phone, Gift } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCampaigns, updateCampaign, createCampaign, deleteCampaign,
} from '../../../../../services/campaignService';
import { toast } from 'react-toastify';
import CampaignFormModal from './CampaignFormModal';
import Searchbar from '../../../../Searchbar';

export default function CampaignsTab() {
  const queryClient = useQueryClient();
  const { data: campaigns = [], isLoading } = useQuery({ queryKey: ['campaigns'], queryFn: getCampaigns });

  const [searchTerm, setSearchTerm] = useState('');
  const [rows, setRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('create');
  const [campaign, setCampaign] = useState(null);

  useEffect(() => setRows(campaigns), [campaigns]);

  const createMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      toast.success('Campaign created!');
      queryClient.invalidateQueries(['campaigns']);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedRow }) => updateCampaign(id, updatedRow),
    onSuccess: () => {
      toast.success('Campaign updated!');
      queryClient.invalidateQueries(['campaigns']);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      toast.success('Campaign deleted!');
      queryClient.invalidateQueries(['campaigns']);
    },
  });

  const handleEdit = (row) => {
    setMode('edit');
    setCampaign(row);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setMode('create');
    setCampaign({
      title: '', division: 'Dhaka', status: 'Active', raised: 0, goal: 50000, description: "", itemsNeeded: 200, volunteersNeeded: 5,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      contactInfo: '', description: '', organizer: { name: '', avatar: '' },
      location: { address: '', lat: 0, lng: 0 }
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const { _id, ...campaignData } = campaign;
    const payload = { 
      ...campaignData, 
      slug: campaign.title.toLowerCase().replace(/'/g, '').replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') 
    };
    mode === 'create'
      ? createMutation.mutate(payload)
      : updateMutation.mutate({ id: campaign._id, updatedRow: payload});
    setIsModalOpen(false);
  };

  const handleDelete = (id) => deleteMutation.mutate(id);


  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    return rows.filter(c =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.contactInfo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.organizer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, rows]);

  const columns = useMemo(() => [
    {
      key: 'title', name: 'Title', width: 300,
      renderCell: ({ row }) => (
        <Tooltip content={row.description} className="bg-white p-4 shadow-lg border rounded-lg max-w-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium hover:text-primary-600 cursor-pointer">{row.title}</span>
            <Info size={14} className="text-gray-400" />
          </div>
        </Tooltip>
      )
    },
    { key: 'division', name: 'Division', width: 120, renderCell: ({ row }) => <Chip color="blue">{row.division}</Chip> },
    {
      key: 'status', name: 'Status', width: 120, renderCell: ({ row }) => {
        const color = { Active: 'green', Completed: 'blue', Planning: 'orange' }[row.status] || 'red';
        return <Chip color={color}>{row.status}</Chip>;
      }
    },
    {
      key: 'raised', name: 'Raised (৳)', width: 120,
      renderCell: ({ row }) => <div className="font-medium text-green-600">{row.raised.toLocaleString()}</div>
    },
    {
      key: 'goal', name: 'Goal (৳)', width: 120,
      renderCell: ({ row }) => <div className="font-medium text-blue-600">{row.goal.toLocaleString()}</div>
    },
    {
      key: 'progress', name: 'Progress', width: 160,
      renderCell: ({ row }) => {
        const percent = Math.min(100, Math.round((row.raised / row.goal) * 100));
        return (
          <div className="w-full">
            <Progress className="h-2 progress progress-info" value={percent} maxValue={100} />
            <div className="text-xs text-center text-gray-500 mt-1">{percent}%</div>
          </div>
        );
      }
    },
    {
      key: 'items', name: 'Items', width: 140,
      renderCell: ({ row }) => (
        <Tooltip content={`${row.itemsCollected} of ${row.itemsNeeded}`} className="bg-white p-3 shadow-lg border rounded">
          <div className="flex items-center gap-1"><Gift size={14} className="text-purple-500" />{row.itemsCollected}/{row.itemsNeeded}</div>
        </Tooltip>
      )
    },
    {
      key: 'volunteersNeeded', name: 'Volunteers', width: 100,
      renderCell: ({ row }) => <div className="flex items-center gap-1"><User size={14} className="text-orange-500" />{row.volunteersNeeded}</div>
    },
    {
      key: 'contactInfo', name: 'Contact', width: 250,
      renderCell: ({ row }) => (
        <Tooltip content={row.contactInfo} className="bg-white p-3 shadow-lg border rounded">
          <div className="flex items-center text-blue-600 gap-1"><Phone size={14} />{row.contactInfo}</div>
        </Tooltip>
      )
    },
    {
      key: 'duration', name: 'Duration', width: 220,
      renderCell: ({ row }) => (
        <Tooltip content={`${row.startDate} → ${row.endDate}`} className="bg-white p-3 shadow-lg border rounded">
          <div className="flex items-center gap-2 text-sm text-gray-700"><Calendar size={14} />{row.startDate} → {row.endDate}</div>
        </Tooltip>
      )
    },
    {
      key: 'location', name: 'Location', width: 180,
      renderCell: ({ row }) => (
        <Tooltip content={`${row.location?.address}\nLat: ${row.location?.lat}, Lng: ${row.location?.lng}`} className="bg-white p-3 whitespace-pre-line">
          <div className="flex items-center gap-2"><MapPin size={14} className="text-red-500" />{row.location?.address?.slice(0, 20) || 'TBD'}</div>
        </Tooltip>
      )
    },
    {
      key: 'organizer', name: 'Organizer', width: 160,
      renderCell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.organizer?.avatar && <img src={row.organizer.avatar} alt="" className="w-5 h-5 rounded-full" />}
          <span>{row.organizer?.name}</span>
        </div>
      )
    },
    {
      key: 'actions', name: 'Actions', width: 120,
      renderCell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => handleEdit(row)} startContent={<Edit size={14} className='text-blue-600' />} />
          <Button size="sm" onClick={() => handleDelete(row._id)} startContent={<Trash2 size={14} className='text-red-600'/>} />
        </div>
      )
    }
  ], []);

  if (isLoading) return <div className="p-6 text-center">Loading campaigns...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-cyan-50 border-l-2 border-cyan-500">
      <div  className='w-full text-center'>
        <div>
          <h2 className="text-2xl font-semibold text-cyan-700">Campaign Management</h2>
          <p className="text-gray-600">Manage all donation campaigns</p>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-10 mt-5'>
          <Searchbar
            onSearch={(value) => setSearchTerm(value)}
            placeholder="Search campaigns by title, organizer, division or contact info"
            className='w-3/5'
          />
          <Button className='bg-cyan-500 text-white' onClick={handleCreateClick} startContent={<Plus />}>Create Campaign</Button>
        </div>
        
      </div>

      <div className="bg-white rounded-lg shadow border overflow-auto">
        <DataGrid
          columns={columns}
          rows={filteredRows}
          className="rdg-light"
          style={{
            minHeight: 600,
            '--rdg-header-background-color': '#e0f2fe',
            '--rdg-header-color': '#1e40af',
            '--rdg-header-font-weight': '600',
          }}
        />
      </div>

      <CampaignFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        campaignData={campaign}
        setCampaignData={setCampaign}
        onSubmit={handleSubmit}
        mode={mode}
      />
    </div>
  );
}
