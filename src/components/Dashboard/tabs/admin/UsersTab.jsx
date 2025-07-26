import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";

import { Select, SelectItem } from "@heroui/select";
import { FiSearch, FiMoreVertical } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
} from "../../../../services/userService";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Partner", value: "partner" },
  { label: "Donor", value: "donor" },
  { label: "Volunteer", value: "volunteer" },
];

export default function UserTab() {
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  // Modal & form state
  const modal = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // New or editing user data
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    photo: "",
  });

  // Filter users by search term
  useEffect(() => {
    const filtered = users.filter((user) => {
      const term = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    });
    setFilteredUsers(filtered);
    setPage(1);
  }, [searchTerm, users]);

  // Pagination slice
  const pages = Math.ceil(filteredUsers.length / rowsPerPage);
  const items = filteredUsers.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Open modal for add or edit
  function openAddModal() {
    setIsEditing(false);
    setFormUser({ name: "", email: "", phone: "", role: "", photo: "" });
    modal.onOpen();
  }
  function openEditModal(user) {
    setIsEditing(true);
    setSelectedUser(user);
    setFormUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      photo: user.photo,
    });
    modal.onOpen();
  }

  // Delete user
  async function handleDelete(userId) {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error("Delete error:", error);
    }
  }

  // Role change handler for inline select in table
  async function handleRoleChange(userId, newRole) {
    try {
      await updateUserRole(userId, { role: newRole });
    } catch (error) {
      console.error("Role update error:", error);
    }
  }

  // Form submit for create/update user
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(selectedUser._id, formUser);
      } else {
        await createUser(formUser);
      }
      modal.onOpenChange(false);
    } catch (error) {
      console.error("Save error:", error);
    }
  }

  return (
    <div className="p-4">
      {/* Search & Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <Input
          startContent={<FiSearch />}
          placeholder="Search by name, email or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          clearable
          className="sm:max-w-[44%]"
        />
        <Button color="primary" onPress={openAddModal}>
          Add New User
        </Button>
      </div>

      {/* Users table */}
      <Table
        aria-label="Users table"
        className="min-h-[400px]"
        bottomContent={
          <div className="flex justify-center w-full mt-2">
            <Pagination
              total={pages}
              page={page}
              isCompact
              showControls
              onChange={(p) => setPage(p)}
              color="primary"
            />
          </div>
        }
      >
        <TableHeader columns={["user", "email", "phone", "role", "joined", "actions"]}>
          {(column) => {
            switch (column) {
              case "user":
                return <TableColumn key={column}>USER</TableColumn>;
              case "email":
                return <TableColumn key={column}>EMAIL</TableColumn>;
              case "phone":
                return <TableColumn key={column}>PHONE</TableColumn>;
              case "role":
                return <TableColumn key={column}>ROLE</TableColumn>;
              case "joined":
                return <TableColumn key={column}>JOINED</TableColumn>;
              case "actions":
                return <TableColumn key={column}>ACTIONS</TableColumn>;
              default:
                return null;
            }
          }}
        </TableHeader>

        <TableBody items={items}>
          {(user) => (
            <TableRow key={user._id}>
              {(columnKey) => {
                switch (columnKey) {
                  case "user":
                    return (
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar src={user.photo} size="sm" isBordered />
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                    );
                  case "email":
                    return <TableCell>{user.email}</TableCell>;
                  case "phone":
                    return <TableCell>{user.phone}</TableCell>;
                  case "role":
                    return (
                      <TableCell>
                        <Select
                          size="sm"
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="w-32"
                        >
                          {roles.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </Select>
                      </TableCell>
                    );
                  case "joined":
                    return (
                      <TableCell>
                        {new Date(user.joined).toLocaleDateString()}
                      </TableCell>
                    );
                  case "actions":
                    return (
                      <TableCell>
                        <Dropdown placement="bottom-end">
                          <DropdownTrigger>
                            <Button isIconOnly size="sm" variant="light">
                              <FiMoreVertical />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem onClick={() => openEditModal(user)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              color="danger"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    );
                  default:
                    return null;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Modal for add/edit user */}
      <Modal isOpen={modal.isOpen} onOpenChange={modal.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <ModalHeader>{isEditing ? "Edit User" : "Add New User"}</ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  required
                  value={formUser.name}
                  onChange={(e) =>
                    setFormUser((f) => ({ ...f, name: e.target.value }))
                  }
                />
                <Input
                  label="Email"
                  type="email"
                  required
                  value={formUser.email}
                  onChange={(e) =>
                    setFormUser((f) => ({ ...f, email: e.target.value }))
                  }
                />
                <Input
                  label="Phone"
                  value={formUser.phone}
                  onChange={(e) =>
                    setFormUser((f) => ({ ...f, phone: e.target.value }))
                  }
                />
                <Select
                  label="Role"
                  required
                  value={formUser.role}
                  onChange={(e) =>
                    setFormUser((f) => ({ ...f, role: e.target.value }))
                  }
                >
                  {roles.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Photo URL"
                  value={formUser.photo}
                  onChange={(e) =>
                    setFormUser((f) => ({ ...f, photo: e.target.value }))
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit">
                  {isEditing ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
