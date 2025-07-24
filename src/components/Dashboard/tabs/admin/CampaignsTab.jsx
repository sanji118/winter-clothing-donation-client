import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getCampaigns, 
  createCampaign, 
  updateCampaign, 
  deleteCampaign 
} from '../../../../services/campaignService';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Chip
} from '@nextui-org/react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash, 
  CalendarDays,
  CircleDollarSign,
  Mail,
  MapPin,
  Box,
  Check
} from 'lucide-react';

const CampaignsTab = () => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    status: 'Active',
    contactInfo: '',
    division: '',
    goal: '',
    itemsNeeded: '',
    startDate: '',
    endDate: ''
  });

  // Status color mapping
  const statusColorMap = {
    Active: "success",
    Upcoming: "primary",
    Completed: "default"
  };

  // Fetch campaigns
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: getCampaigns
  });

  // Mutations (create, update, delete)
  const createMutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
      onOpenChange(false);
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateCampaign(selectedCampaign._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
      setEditMode(false);
      onOpenChange(false);
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries(['campaigns']);
    }
  });

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editMode ? updateMutation.mutate(campaignData) : createMutation.mutate(campaignData);
  };

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setCampaignData({
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      contactInfo: campaign.contactInfo,
      division: campaign.division,
      goal: campaign.goal,
      itemsNeeded: campaign.itemsNeeded,
      startDate: campaign.startDate.split('T')[0],
      endDate: campaign.endDate.split('T')[0]
    });
    setEditMode(true);
    onOpen();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setCampaignData({
      title: '',
      description: '',
      status: 'Active',
      contactInfo: '',
      division: '',
      goal: '',
      itemsNeeded: '',
      startDate: '',
      endDate: ''
    });
    setEditMode(false);
    setSelectedCampaign(null);
  };

  // Filter and pagination
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(filterValue.toLowerCase()) ||
    campaign.division.toLowerCase().includes(filterValue.toLowerCase())
  );

  const rowsPerPage = 8;
  const pages = Math.ceil(filteredCampaigns.length / rowsPerPage);
  const items = filteredCampaigns.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-500 mt-1">Manage all charity campaigns in one place</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            isClearable
            className="w-full sm:w-64"
            placeholder="Search campaigns..."
            startContent={<Search className="text-gray-400" size={18} />}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onChange={(e) => setFilterValue(e.target.value)}
            variant="bordered"
          />
          <Button
            color="primary"
            startContent={<Plus size={18} />}
            onClick={() => { resetForm(); onOpen(); }}
            className="whitespace-nowrap"
          >
            New Campaign
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <Box size={20} />
            </div>
            <div>
              <p className="text-gray-500">Total Campaigns</p>
              <p className="text-xl font-semibold">{campaigns.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <Check size={20} />
            </div>
            <div>
              <p className="text-gray-500">Active</p>
              <p className="text-xl font-semibold">
                {campaigns.filter(c => c.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <CalendarDays size={20} />
            </div>
            <div>
              <p className="text-gray-500">Upcoming</p>
              <p className="text-xl font-semibold">
                {campaigns.filter(c => c.status === 'Upcoming').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gray-50 text-gray-600">
              <CircleDollarSign size={20} />
            </div>
            <div>
              <p className="text-gray-500">Total Raised</p>
              <p className="text-xl font-semibold">
                ৳{campaigns.reduce((sum, c) => sum + c.raised, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-auto">
        <Table
          aria-label="Campaigns table"
          bottomContent={
            <div className="flex w-full justify-center p-4">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={setPage}
              />
            </div>
          }
          classNames={{
            wrapper: "min-h-[400px] rounded-b-xl",
            th: "bg-gray-50 text-gray-700 font-semibold",
            td: "py-4"
          }}
        >
          <TableHeader>
            <TableColumn width="120px">IMAGE</TableColumn>
            <TableColumn>TITLE</TableColumn>
            <TableColumn width="120px">STATUS</TableColumn>
            <TableColumn width="150px">DIVISION</TableColumn>
            <TableColumn width="180px">PROGRESS</TableColumn>
            <TableColumn width="200px">DATES</TableColumn>
            <TableColumn width="150px">ACTIONS</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<span className="loading loading-spinner loading-lg"></span>}
            emptyContent="No campaigns found"
          >
            {items.map((campaign) => (
              <TableRow key={campaign._id}>
                <TableCell>
                  <div className="flex items-center">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{campaign.title}</span>
                    <span className="text-sm text-gray-500 line-clamp-1">
                      {campaign.description.substring(0, 60)}...
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip 
                    color={statusColorMap[campaign.status]} 
                    variant="flat"
                    size="sm"
                  >
                    {campaign.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <span className="text-gray-700">{campaign.division}</span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">৳{campaign.raised.toLocaleString()}</span>
                      <span className="text-gray-500">৳{campaign.goal.toLocaleString()}</span>
                    </div>
                    <progress 
                      className="progress progress-primary w-full h-2" 
                      value={campaign.raised} 
                      max={campaign.goal}
                    ></progress>
                    <span className="text-xs text-gray-500 text-right">
                      {Math.round((campaign.raised / campaign.goal) * 100)}% funded
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarDays size={14} className="text-gray-400" />
                      <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays size={14} className="text-gray-400" />
                      <span>{new Date(campaign.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="light"
                      color="primary"
                      isIconOnly
                      onClick={() => handleEdit(campaign)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant="light"
                      color="danger"
                      isIconOnly
                      onClick={() => handleDelete(campaign._id)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Campaign Form Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent className="bg-white shadow-md overflow-hidden">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b p-6">
                <h3 className="text-lg font-semibold">Edit Campaign</h3>
              </ModalHeader>

              <form onSubmit={handleSubmit}>
                <ModalBody className="p-6 space-y-6 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Title</label>
                        <Input
                          name="title"
                          value={campaignData.title}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Contact Email</label>
                        <Input
                          name="contactInfo"
                          type="email"
                          value={campaignData.contactInfo}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Goal Amount (৳)</label>
                        <Input
                          name="goal"
                          type="number"
                          value={campaignData.goal}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Start Date</label>
                        <Input
                          name="startDate"
                          type="date"
                          value={campaignData.startDate}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Select
                          name="status"
                          selectedKeys={[campaignData.status]}
                          onChange={(value) =>
                            setCampaignData((prev) => ({
                              ...prev,
                              status: value.target.value,
                            }))
                          }
                          variant="bordered"
                          classNames={{
                            trigger: "pe-10",
                            popoverContent: "bg-white z-50",
                            listbox: "bg-white",
                            selectorIcon: "text-transparent",
                          }}
                          fullWidth
                        >
                          <SelectItem key="Active">Active</SelectItem>
                          <SelectItem key="Upcoming">Upcoming</SelectItem>
                          <SelectItem key="Completed">Completed</SelectItem>
                        </Select>
                      </div>

                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Division</label>
                        <Input
                          name="division"
                          value={campaignData.division}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Items Needed</label>
                        <Input
                          name="itemsNeeded"
                          type="number"
                          value={campaignData.itemsNeeded}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">End Date</label>
                        <Input
                          name="endDate"
                          type="date"
                          value={campaignData.endDate}
                          onChange={handleChange}
                          variant="bordered"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Description</label>
                    <Textarea
                      name="description"
                      value={campaignData.description}
                      onChange={handleChange}
                      variant="bordered"
                      minRows={3}  
                      maxRows={6}
                      className='max-h-32'  
                      fullWidth  
                    />
                  </div>
                </ModalBody>

                <ModalFooter className="border-t border-gray-200 p-6">
                  <Button variant="light" onPress={onClose} className="bg-red-600 text-white">
                    Cancel
                  </Button>
                  <Button className="bg-cyan-600 text-white" type="submit">
                    Update Campaign
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
};

export default CampaignsTab;