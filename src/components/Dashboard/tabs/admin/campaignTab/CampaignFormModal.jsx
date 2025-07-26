
import { Edit2, PlusCircle } from 'lucide-react';

const statusOptions = ['Active', 'Upcoming', 'Completed'];
const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Barishal', 'Rajshahi', 'Rangpur', 'Mymensingh'];

export default function CampaignFormModal({
  isOpen,
  onClose,
  onSubmit,
  campaignData,
  setCampaignData,
  mode = 'create',
}) {
  const isEdit = mode === 'edit';

  if (!campaignData) return null;

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white">
        <div className="flex items-center gap-2 mb-4">
          {isEdit ? (
            <Edit2 className="w-5 h-5 text-blue-600" />
          ) : (
            <PlusCircle className="w-5 h-5 text-blue-600" />
          )}
          <h3 className="text-xl font-bold text-gray-800">
            {isEdit ? 'Edit Campaign' : 'Create New Campaign'}
          </h3>
        </div>

        <form method="dialog" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Core Fields */}
            <div>
              <label className="label"><span className="label-text">Title</span></label>
              <input type="text" value={campaignData.title} onChange={(e) => setCampaignData({ ...campaignData, title: e.target.value })} className="input input-bordered w-full bg-gray-100" />
            </div>

            <div>
              <label className="label"><span className="label-text">Division</span></label>
              <select value={campaignData.division} onChange={(e) => setCampaignData({ ...campaignData, division: e.target.value })} className="select select-bordered w-full bg-gray-100">
                <option disabled>Select a Division</option>
                {divisions.map((division) => (
                  <option key={division}>{division}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Status</span></label>
              <select value={campaignData.status} onChange={(e) => setCampaignData({ ...campaignData, status: e.target.value })} className="select select-bordered w-full bg-gray-100">
                {statusOptions.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Contact Info</span></label>
              <input type="text" value={campaignData.contactInfo} onChange={(e) => setCampaignData({ ...campaignData, contactInfo: e.target.value })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Raised (৳)</span></label>
              <input type="number" value={campaignData.raised} onChange={(e) => setCampaignData({ ...campaignData, raised: Number(e.target.value) })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Goal (৳)</span></label>
              <input type="number" value={campaignData.goal} onChange={(e) => setCampaignData({ ...campaignData, goal: Number(e.target.value) })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Items Needed</span></label>
              <input type="number" value={campaignData.itemsNeeded} onChange={(e) => setCampaignData({ ...campaignData, itemsNeeded: Number(e.target.value) })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Volunteers Needed</span></label>
              <input type="number" value={campaignData.volunteersNeeded} onChange={(e) => setCampaignData({ ...campaignData, volunteersNeeded: Number(e.target.value) })} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label"><span className="label-text">Description</span></label>
              <textarea value={campaignData.description} onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })} className="textarea textarea-bordered w-full min-h-[120px]"></textarea>
            </div>

            <div>
              <label className="label"><span className="label-text">Start Date</span></label>
              <input type="date" value={campaignData.startDate} onChange={(e) => setCampaignData({ ...campaignData, startDate: e.target.value })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">End Date</span></label>
              <input type="date" value={campaignData.endDate} onChange={(e) => setCampaignData({ ...campaignData, endDate: e.target.value })} className="input input-bordered w-full" />
            </div>

            {/* --- Real Location Fields --- */}
            <div>
              <label className="label"><span className="label-text">Latitude</span></label>
              <input type="number" value={campaignData.location?.lat || ''} onChange={(e) => setCampaignData({ ...campaignData, location: { ...campaignData.location, lat: parseFloat(e.target.value) } })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Longitude</span></label>
              <input type="number" value={campaignData.location?.lng || ''} onChange={(e) => setCampaignData({ ...campaignData, location: { ...campaignData.location, lng: parseFloat(e.target.value) } })} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label"><span className="label-text">Full Address</span></label>
              <input type="text" value={campaignData.location?.address || ''} onChange={(e) => setCampaignData({ ...campaignData, location: { ...campaignData.location, address: e.target.value } })} className="input input-bordered w-full" />
            </div>

            {/* --- Organizer Fields --- */}
            <div>
              <label className="label"><span className="label-text">Organizer Name</span></label>
              <input type="text" value={campaignData.organizer?.name || ''} onChange={(e) => setCampaignData({ ...campaignData, organizer: { ...campaignData.organizer, name: e.target.value } })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Organizer Email</span></label>
              <input type="email" value={campaignData.organizer?.email || ''} onChange={(e) => setCampaignData({ ...campaignData, organizer: { ...campaignData.organizer, email: e.target.value } })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Organizer Phone</span></label>
              <input type="text" value={campaignData.organizer?.phone || ''} onChange={(e) => setCampaignData({ ...campaignData, organizer: { ...campaignData.organizer, phone: e.target.value } })} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Organization</span></label>
              <input type="text" value={campaignData.organizer?.organization || ''} onChange={(e) => setCampaignData({ ...campaignData, organizer: { ...campaignData.organizer, organization: e.target.value } })} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label"><span className="label-text">Avatar URL</span></label>
              <input type="text" value={campaignData.organizer?.avatar || ''} onChange={(e) => setCampaignData({ ...campaignData, organizer: { ...campaignData.organizer, avatar: e.target.value } })} className="input input-bordered w-full" />
            </div>
          </div>

          <div className="modal-action mt-6">
            <button type="button" onClick={onClose} className="btn bg-red-600 text-white">Cancel</button>
            <button type="submit" onClick={onSubmit} className="btn btn-info">
              {isEdit ? 'Save Changes' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
