"use client";

import { Table } from "antd";
import { useGetSubjectsQuery } from "../useSubject";

export function DataSubject() {
  const { data, isLoading } = useGetSubjectsQuery({
    page: 1,
    limit: 10,
  });

  console.log(data);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <div>
      <Table dataSource={[]} columns={columns} />
    </div>
  );
}
