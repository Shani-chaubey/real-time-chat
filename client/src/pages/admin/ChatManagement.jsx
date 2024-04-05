import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../constants/sampleData";
import { transformImage } from "../../lib/features";
import AvatarCrad from './../../components/shared/AvatarCrad';

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <AvatarCrad max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <AvatarCrad max={100} avatar={params.row.members} />
    ),
  },
];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.users.map((item) => ({
        ...item,
        id: item._id,
        avatar: transformImage(item.avatar, 50),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table
        heading={"all Chats"}
        columns={columns}
        rows={rows}
        rowHeight={50}
      />
    </AdminLayout>
  );
};

export default ChatManagement;
