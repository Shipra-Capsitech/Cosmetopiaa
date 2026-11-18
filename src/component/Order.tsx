import { useEffect, useState } from "react";
import { Table } from "antd";
import type { TablePaginationConfig } from "antd";
import { SlCalender } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import API from "../api/axios";

interface OrderType {
  key: string;
  orderId: string;
  customer: string;
  product: string;
  status: string;
  amount: string;
}

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Customer",
    dataIndex: "customer",
    key: "customer",
  },
  {
    title: "Product",
    dataIndex: "product",
    key: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

function Order() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedStatus, setSelectedStatus] =
    useState<string>("All Orders");

  const [searchQuery, setSearchQuery] = useState("");

  const [paginationState, setPaginationState] = useState({
    current: 1,
    pageSize: 5,
  });

  // =========================================================
  // GET ALL ORDERS
  // =========================================================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await API.get("/Order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("ORDER API RESPONSE:", response.data);

        const formattedData: OrderType[] = response.data.map(
          (order: any, index: number) => {
            // -------------------------------
            // ID
            // -------------------------------
            const orderId =
              order.id ||
              order._id ||
              "";

            // -------------------------------
            // CUSTOMER
            // -------------------------------
            const customer =
              order.address?.fullName ||
              order.Address?.FullName ||
              "Unknown Customer";

            // -------------------------------
            // ITEMS
            // -------------------------------
            const items =
              order.items ||
              order.Items ||
              [];

            const firstItem = items[0];

            const product =
              firstItem?.productName ||
              firstItem?.ProductName ||
              firstItem?.name ||
              firstItem?.Name ||
              "Cosmetic Item";

            // -------------------------------
            // STATUS
            // -------------------------------
            const backendStatus =
              order.orderStatus ||
              order.OrderStatus ||
              "Pending";

            // Processing -> In Progress
            let displayStatus = backendStatus;

            if (
              backendStatus.toLowerCase() === "processing"
            ) {
              displayStatus = "In Progress";
            }

            // -------------------------------
            // AMOUNT
            // -------------------------------
            const rawAmount =
              order.totalAmount ??
              order.TotalAmount ??
              0;

            let amount = "0";

            if (typeof rawAmount === "object") {
              amount =
                rawAmount.$numberDecimal ||
                rawAmount.value ||
                "0";
            } else {
              amount = String(rawAmount);
            }

            return {
              key: orderId || index.toString(),
              orderId: orderId,
              customer: customer,
              product: product,
              status: displayStatus,
              amount: `₹${amount}`,
            };
          }
        );

        console.log("FORMATTED ORDERS:", formattedData);

        setOrders(formattedData);
      } catch (err: any) {
        console.error("Fetch Orders Error:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================================================
  // PAGINATION
  // =========================================================

  const handleTableChange = (
    newPagination: TablePaginationConfig
  ) => {
    setPaginationState({
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || 5,
    });
  };

  // =========================================================
  // FILTER + SEARCH
  // =========================================================

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "All Orders" ||
      order.status.toLowerCase() ===
        selectedStatus.toLowerCase();

    const query = searchQuery.toLowerCase();

    const matchesSearch =
      order.orderId.toLowerCase().includes(query) ||
      order.customer.toLowerCase().includes(query) ||
      order.product.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  // =========================================================
  // STATUS BUTTONS
  // =========================================================

  const statuses = [
    "All Orders",
    "In Progress",
    "Pending",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="flex min-h-screen bg-pink-50">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-64 min-h-screen bg-white shadow-lg p-6">

        <h1 className="text-3xl text-pink-500 font-bold italic mb-8">
          Cosmetopia
        </h1>

        <nav className="space-y-2">

          <a
            href="/Dashboard"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Dashboard
          </a>

          <a
            href="/Index"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Products
          </a>

          <a
            href="/Order"
            className="block p-3 rounded-lg bg-pink-500 text-white"
          >
            Orders
          </a>

          <a
            href="/Settings"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Settings
          </a>

          <a
            href="/Login"
            className="block p-3 rounded-lg hover:bg-pink-100"
          >
            Logout
          </a>

        </nav>
      </aside>

      {/* ================= MAIN ================= */}

      <main className="flex-1 p-6">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-5">

          <h1 className="text-3xl font-bold">
            Orders
          </h1>

          <div className="flex items-center gap-2 w-[190px] h-[40px] px-3 bg-white border border-gray-300 rounded-md shadow-sm">

            <SlCalender className="text-gray-600 text-[16px]" />

            <span className="text-sm text-gray-700">
              May 1 - May 30
            </span>

          </div>

        </div>

        {/* DESCRIPTION */}

        <div className="pb-6">

          <h3 className="font-bold text-xl">
            Manage and track cosmetic orders
          </h3>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}

        </div>

        {/* ================= STATUS FILTERS ================= */}

        <div className="flex flex-wrap gap-4 m-4">

          {statuses.map((status) => {

            const isActive =
              selectedStatus === status;

            return (
              <button
                key={status}
                onClick={() =>
                  setSelectedStatus(status)
                }
                className={`w-36 h-10 rounded-lg font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-pink-700 text-white"
                    : "border-2 border-pink-700 text-black bg-transparent hover:bg-pink-700 hover:text-white"
                }`}
              >
                {status}
              </button>
            );
          })}

        </div>

        {/* ================= SEARCH ================= */}

        <div className="flex items-center gap-2 bg-white w-[500px] h-11 m-6 rounded-lg px-4 border border-yellow-200/50 shadow-sm">

          <FaSearch
            className="text-gray-700"
            size={16}
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            placeholder="Search by order ID, customer, or product"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none"
          />

        </div>

        {/* ================= TABLE ================= */}

        <div className="bg-white p-6 rounded-xl font-bold border border-gray-100 shadow-2xl">

          <Table
            columns={columns}
            dataSource={filteredOrders}
            loading={loading}
            bordered

            rowKey="key"

            pagination={{
              current: paginationState.current,
              pageSize: paginationState.pageSize,

              showSizeChanger: true,

              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,

              total: filteredOrders.length,
            }}

            onChange={handleTableChange}

            className="
              [&_.ant-table]:bg-[#fff0f5]
              [&_.ant-table-thead>tr>th]:bg-white
              [&_.ant-table-thead>tr>th]:text-black
              [&_.ant-table-tbody>tr>td]:bg-[#fff0f5]
            "
          />

        </div>

      </main>
    </div>
  );
}

export default Order;