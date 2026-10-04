import { Building2, Edit, Eye } from "lucide-react";
import { Button, Table, type TableColumn } from "..";

type Tenant = {
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
};

const tenants: Tenant[] = [
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

const columns: TableColumn<Tenant>[] = [
  { key: "name", title: "Name", sortable: true, filterable: true, clickable: true },
  {
    key: "company",
    title: "Company",
    sortable: true,
    filterable: true,
    render: (value) => (
      <div className="flex items-center">
        <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-info-subtle">
          <Building2 size={16} className="text-info" />
        </div>
        <span className="font-medium">{String(value)}</span>
      </div>
    ),
  },
  { key: "profession", title: "Profession", sortable: true, filterable: true },
  {
    key: "plan",
    title: "Plan",
    sortable: true,
    filterable: true,
    render: (value) => <span className="text-sm font-medium">{String(value)}</span>,
  },
  { key: "users", title: "Users", sortable: true },
  {
    key: "status",
    title: "Status",
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className="rounded-full bg-success-subtle px-2 py-1 text-xs text-success">
        {String(value)}
      </span>
    ),
  },
  { key: "lastLogin", title: "Last Login", sortable: true },
  {
    key: "revenue",
    title: "Revenue",
    sortable: true,
    render: (value) => <span className="font-medium text-success">{String(value)}</span>,
  },
  {
    key: "actions",
    title: "Actions",
    render: () => (
      <div className="flex gap-2">
        <Button variant="link" size="sm" leftIcon={<Eye size={16} />}>
          View
        </Button>
        <Button variant="link" size="sm" leftIcon={<Edit size={16} />}>
          Edit
        </Button>
      </div>
    ),
  },
];

export default function TableDemo() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="mb-2 text-3xl font-bold">Table</h1>
        <p className="text-muted-foreground">
          Generic client-side sorting, search, filters, selection, pagination, loading overlay,
          and empty state. Mobile uses a stacked layout.
        </p>
      </header>
      <Table
        columns={columns}
        data={tenants}
        selectable
        showSearch
        showFilter
        pageSize={10}
        onRowClick={(record) => {
          console.log(record.name);
        }}
      />
    </div>
  );
}
