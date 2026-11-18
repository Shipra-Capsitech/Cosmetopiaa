import RevenueChart from "./RevenueChart";
import Chart from "./Chart";


function Dashboard() {

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* /Sidebar */}

      <aside className="w-64 bg-white shadow-lg p-6 ">
        <h1 className="text-3xl text-pink-500 font-bold italic mb-8">
          Cosmetopia
        </h1>

        <nav className="space-y-2">
          <a className="block p-3 rounded-lg bg-pink-500 text-white"> Dashboard</a>
          <a href="/Index" className="block p-3 rounded-lg hover:bg-pink-100"> Products </a>
          <a href="/Order" className="block p-3 rounded-lg hover:bg-pink-100"> Orders</a>
          <a href="/Settings" className="block p-3 rounded-lg hover:bg-pink-100">Settings</a>
          <a href="/Login" className="block p-3 rounded-lg hover:bg-pink-100">Logout</a>
        </nav>

        {/* Main Content */}
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="w-full h-[238px] rounded-md overflow-hidden bg-pink-200 p-5">
            <p className="text-sm flex items-center justify-center mt-4">
              Total revenue
            </p>

            <h1 className="text-3xl flex items-center justify-center font-bold mt-5">
              $32,450
            </h1>

            <div className="flex items-center justify-center mt-8">
              <p className="text-sm text-green-500">+24.2%</p>

              <p className="text-sm ml-4">VS Apr1-Apr30</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full h-[238px] rounded-md overflow-hidden bg-pink-200 p-5">
            <p className="text-sm flex items-center justify-center mt-4">
              Total Orders
            </p>

            <h1 className="text-3xl flex items-center justify-center font-bold mt-5">
              11,243
            </h1>

            <div className="flex items-center justify-center mt-8">
              <p className="text-sm text-green-500">+27.3%</p>

              <p className="text-sm ml-4">VS Apr1-Apr30</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full h-[238px] rounded-md overflow-hidden bg-pink-200 p-5">
            <p className="text-sm flex items-center justify-center mt-4">
              Active Designers
            </p>

            <h1 className="text-3xl flex items-center justify-center font-bold mt-5">
              187
            </h1>

            <div className="flex items-center justify-center mt-8">
              <p className="text-sm text-green-500">+13.4%</p>

              <p className="text-sm ml-4">VS Apr1-Apr30</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full h-[238px] rounded-md overflow-hidden bg-pink-200 p-5">
            <p className="text-sm flex items-center justify-center mt-4">
              Pending Orders
            </p>

            <h1 className="text-3xl flex items-center justify-center font-bold mt-5">
              253
            </h1>

            <div className="flex items-center justify-center mt-8">
              <p className="text-sm text-red-500">-6.7%</p>

              <p className="text-sm ml-4">VS Apr1-Apr30</p>
            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* ================= TOTAL REVENUE ================= */}
          <div className="w-full h-[520px] rounded-md overflow-hidden bg-pink-200 p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Total Revenue</h1>
            </div>

            <h1 className="mt-5 text-3xl flex items-center font-bold">
              $32,450
              <span className="ml-4 text-sm text-green-500">+24.2%</span>
            </h1>

            <div className="mt-5">
              <RevenueChart />
            </div>
          </div>

          {/* ================= ORDERS BY STATUS ================= */}
          <div className="w-full h-[520px] rounded-md overflow-hidden bg-pink-200 p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Orders by Status</h1>

              <span>Total 11,243</span>
            </div>

            <div className="flex items-center gap-10 mt-10">
              <Chart />

              <ul className="flex-1 list-none space-y-5">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: "#8b5a2b" }}
                    />
                    Pending
                  </span>

                  <b>4231</b>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: "#d8c1a8" }}
                    />
                    In Progress
                  </span>

                  <b>2187</b>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: "#ffb347" }}
                    />
                    Shipped
                  </span>

                  <b>2081</b>
                </li>

                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: "#0a7d0a" }}
                    />
                    Delivered
                  </span>

                  <b>1524</b>
                </li>
              </ul>
            </div>
          </div>

        
        </div>
      </main>
    </div>
  );
}
export default Dashboard;
