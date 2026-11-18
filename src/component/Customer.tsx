function Customer() {
  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* /Sidebar */}

      <aside className="w-64 bg-white shadow-lg p-6 ">
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

          <a href="/Order" className="block p-3 rounded-lg hover:bg-pink-100">
            {" "}
            Orders
          </a>

          <a className="block p-3 rounded-lg bg-pink-500 text-white">
            Customers
          </a>

          <a className="block p-3 rounded-lg hover:bg-pink-100">Settings</a>
        </nav>
      </aside>
      
    </div>
  );
}

export default Customer;
