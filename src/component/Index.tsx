import  { useState,useEffect } from 'react';
import { Button, Drawer, Form, Input, InputNumber, Space } from 'antd';
import { SlCalender } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi"; 
import {PickList} from 'primereact/picklist';

import products from "../Json/db.json";
import type { Product } from "../types/Product";

function Index() {
  const [open, setOpen] = useState(false);
  const [productList, setProductList] = useState<Product[]>(products);
  const [form] = Form.useForm();
  const [source,setSource]=useState([]);
  const[target,setTarget]=useState([]);


  useEffect(()=>{

  })

  
  // Track which product is being edited (null means we are adding a new product)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Trigger for adding a brand new product
  const showAddDrawer = () => {
    setEditingProduct(null);
    form.resetFields();
    setOpen(true);
  };

  // Trigger for editing an existing product
  const showEditDrawer = (product: Product) => {
    setEditingProduct(product);
    // Pre-populate the form with current item fields
    form.setFieldsValue({
      name: product.name,
      category: product.category,
      price: product.price,
      left: product.left,
      image: product.image,
    });
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditingProduct(null);
    form.resetFields();
  };

  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingProduct) {
          // ================= EDIT MODE =================
          setProductList((prev) =>
            prev.map((item) =>
              item.id === editingProduct.id
                ? { ...item, ...values } // Update existing record
                : item
            )
          );
        } else {
          // ================= ADD MODE =================
          const newProduct: Product = {
            id: Date.now(),
            name: values.name,
            category: values.category,
            price: values.price,
            left: values.left || 0,
            stock: values.left || 0,
            image: values.image || "https://placeholder.com",
          };
          setProductList((prev) => [newProduct, ...prev]);
        }
        onClose();
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="flex min-h-screen bg-pink-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-3xl text-pink-500 font-bold italic mb-8">
          Cosmetopia
        </h1>
        <nav className="space-y-2">
          <a href="/Dashboard" className="block p-3 rounded-lg hover:bg-pink-100"> Dashboard </a>
          <a href="/Index" className="block p-3 rounded-lg bg-pink-500 text-white"> Products</a>
          <a href="/Order" className="block p-3 rounded-lg hover:bg-pink-100"> Orders </a>
          <a href="/Settings" className="block p-3 rounded-lg hover:bg-pink-100"> Settings </a>
          <a href="/Login" className="block p-3 rounded-lg hover:bg-pink-100">Logout</a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 w-[190px] h-[40px] px-3 bg-white border border-gray-300 rounded-md shadow-sm">
              <SlCalender className="text-gray-600 text-[16px]" />
              <span className="text-sm text-gray-700">May 1 - May 30</span>
            </div>

            <Button type="primary" size="large" className="bg-pink-500 hover:bg-pink-600 border-none" onClick={showAddDrawer}>
              + Add Product
            </Button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-white w-[500px] h-11 m-6 rounded-lg px-4 border border-yellow-200/50 shadow-sm">
          <FaSearch className="text-gray-700" size={16} />
          <input
            type="text"
            placeholder="Search by order ID, customer, or email"
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div className="pb-6">
          <h3 className="font-bold text-xl">Manage and track cosmetic orders</h3>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-5 gap-10">
          {productList.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* Floating Edit Button overlay appearing on hover */}
              <button 
                onClick={() => showEditDrawer(product)}
                className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-pink-500 hover:text-white p-2 rounded-full shadow transition-colors text-gray-700 cursor-pointer"
                title="Edit Product Stock"
              >
                <FiEdit size={16} />
              </button>

              {/* Image */}
              <div className="h-64 bg-gray-100 flex items-center justify-center p-5">
                <img
                  src={product.image}
                  alt={product.category}
                  className="h-full w-full object-contain hover:scale-105 transition duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-sm text-pink-500 font-medium uppercase">{product.category}</p>
                <h3 className="text-xl font-semibold text-gray-800 mt-2">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-4">₹{product.price}</p>
                <p className="text-xl font-medium text-gray-600 mt-2 flex justify-end">
                   Left: {product.left}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Dynamic Drawer Panel for Add / Edit Actions */}
      <Drawer
        title={editingProduct ? "Modify Product Details" : "Create New Product Profile"}
        placement="right"
        width={450}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleFormSubmit} className="bg-pink-500 hover:bg-pink-600 border-none">
              {editingProduct ? "Save Changes" : "Submit"}
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" name="productForm">
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input placeholder="e.g. Matte Lipstick Velvet" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please input the product category!' }]}
          >
            <Input placeholder="e.g. Lips, Skincare, Eyes" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price (₹)"
            rules={[{ required: true, message: 'Please input the listing price!' }]}
          >
            <InputNumber className="w-full" min={0} placeholder="599" />
          </Form.Item>

          <Form.Item
            name="left"
            label="Available Stock Count (Left)"
            rules={[{ required: true, message: 'Please input the stock quantity!' }]}
          >
            <InputNumber className="w-full" min={0} placeholder="50" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Product Image Resource URL"
          >
            <Input placeholder="https://example.com" />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}

export default Index;
