import React, { useState } from "react";
import { Building2, Eye, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Table from "./common/Table/Table";
import { Button } from "./common/Buttons/Buttons";

interface ITenantsData {
  id: number;
  name: string;
  company: string;
  profession: string;
  plan: string;
  users: number;
  status: string;
  lastLogin: string;
  companyPlan: string;
  companyProfession: string;
  revenue: string;
}

interface IColumnData {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value?: any, record?: any) => React.JSX.Element;
  clickable?: boolean;
}

// Example usage
const TableDemo: React.FC = () => {
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const columns: IColumnData[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      filterable: true,
      clickable: true,
    },
    {
      key: "company",
      title: "Company",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <Building2 size={16} className="text-blue-600" />
          </div>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "profession",
      title: "Profession",
      sortable: true,
      filterable: true,
    },
    {
      key: "plan",
      title: "Plan",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "Enterprise"
              ? "bg-purple-100 text-purple-800"
              : value === "Professional"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "users",
      title: "Users",
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : value === "Trial"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "lastLogin",
      title: "Last Login",
      sortable: true,
    },
    {
      key: "revenue",
      title: "Revenue",
      sortable: true,
      render: (value: string) => (
        <span className="font-medium text-green-600">{value}</span>
      ),
    },
    {
      key: "companyPlan",
      title: "Company Plan",
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "Enterprise"
              ? "bg-purple-100 text-purple-800"
              : value === "Professional"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "companyProfession",
      title: "Company Profession",
      sortable: true,
      filterable: true,
    },
    {
      key: "actions",
      title: "Actions",
      render: (value: any, record: any) => (
        <div className="flex space-x-2">
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setSelectedTenant(record);
              setModalOpen(true);
            }}
            leftIcon={<Eye size={16} />}
          >
            View
          </Button>
          <Button variant="link" size="sm" leftIcon={<Edit size={16} />}>
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const tenantsData: ITenantsData[] = [
    {
      id: 1,
      name: "Gaurav Joshi",
      company: "TechCorp Solutions",
      profession: "Investment Banker",
      plan: "Enterprise",
      users: 156,
      status: "Active",
      lastLogin: "2 hours ago",
      companyPlan: "Enterprise",
      companyProfession: "Investment Banker",
      revenue: "$2,340",
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Digital Dynamics",
      profession: "Software Engineer",
      plan: "Professional",
      users: 89,
      status: "Active",
      lastLogin: "1 day ago",
      companyPlan: "Professional",
      companyProfession: "Software Engineer",
      revenue: "$1,890",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      company: "InnovateLab",
      profession: "Data Scientist",
      plan: "Basic",
      users: 23,
      status: "Trial",
      lastLogin: "3 days ago",
      companyPlan: "Basic",
      companyProfession: "Data Scientist",
      revenue: "$450",
    },
    {
      id: 4,
      name: "Anjali Patel",
      company: "Future Systems",
      profession: "Product Manager",
      plan: "Enterprise",
      users: 234,
      status: "Active",
      lastLogin: "5 hours ago",
      companyPlan: "Enterprise",
      companyProfession: "Product Manager",
      revenue: "$3,120",
    },
    {
      id: 5,
      name: "Vikram Singh",
      company: "CloudTech Inc",
      profession: "DevOps Engineer",
      plan: "Professional",
      users: 67,
      status: "Active",
      lastLogin: "30 minutes ago",
      companyPlan: "Professional",
      companyProfession: "DevOps Engineer",
      revenue: "$1,560",
    },
  ];

  const handleSelectionChange = (
    selectedRows: any[],
    selectedIds: (string | number)[]
  ) => {
    console.log("Selected rows:", selectedRows);
    console.log("Selected IDs:", selectedIds);
  };

  const handleRowClick = (record: any, index: number) => {
    console.log("Row clicked:", record, index);
    navigate(`/${record.name}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Modern Table Component
      </h1>

      <Table
        columns={columns}
        data={tenantsData}
        selectable={true}
        onSelectionChange={handleSelectionChange}
        onRowClick={handleRowClick}
        showSearch={true}
        showFilter={true}
        pageSize={10}
      />
    </div>
  );
};

export default TableDemo;
