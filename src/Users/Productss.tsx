import  { useEffect, useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  message,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import API from "../api/axios";

// ===============================
// PRODUCT TYPE
// ===============================
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

function AdminProducts() {

  // ===============================
  // STATES
  // ===============================

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [form] = Form.useForm();


  // ===============================
  // GET PRODUCTS
  // ===============================

  const getProducts = async () => {

    try {

      setLoading(true);

      const response = await API.get("/Product");

      setProducts(response.data);

    } catch (error) {

      console.log(error);

      message.error("Products load nahi ho rahe");

    } finally {

      setLoading(false);

    }
  };


  // ===============================
  // PAGE LOAD
  // ===============================

  useEffect(() => {

    getProducts();

  }, []);


  // ===============================
  // ADD PRODUCT BUTTON
  // ===============================

  const addProduct = () => {

    setEditingProduct(null);

    form.resetFields();

    setDrawerOpen(true);
  };


  // ===============================
  // EDIT PRODUCT BUTTON
  // ===============================

  const editProduct = (product: Product) => {

    setEditingProduct(product);

    form.setFieldsValue({
      name: product.name,
      price: product.price,
      description: product.description,
    });

    setDrawerOpen(true);
  };


  // ===============================
  // ADD / UPDATE PRODUCT
  // ===============================

  const saveProduct = async (values: any) => {

    try {

      // =========================
      // UPDATE
      // =========================

      if (editingProduct) {

        await API.put(
          `/Product/${editingProduct.id}`,
          values
        );

        message.success("Product updated successfully");

      }

      // =========================
      // ADD
      // =========================

      else {

        await API.post(
          "/Product",
          values
        );

        message.success("Product added successfully");

      }

      // Close drawer
      setDrawerOpen(false);

      // Clear form
      form.resetFields();

      // Get latest products
      getProducts();

    } catch (error) {

      console.log(error);

      message.error("Something went wrong");

    }
  };


  // ===============================
  // DELETE PRODUCT
  // ===============================

  const deleteProduct = async (id: string) => {

    try {

      await API.delete(
        `/Product/${id}`
      );

      message.success("Product deleted successfully");

      getProducts();

    } catch (error) {

      console.log(error);

      message.error("Product delete nahi hua");

    }
  };


  // ===============================
  // TABLE COLUMNS
  // ===============================

  const columns = [

    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      render: (price: number) => (
        <>₹{price}</>
      ),
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Action",
      key: "action",

      render: (_: any, product: Product) => (

        <div className="flex gap-2">

          {/* EDIT */}

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() =>
              editProduct(product)
            }
          >
            Edit
          </Button>


          {/* DELETE */}

          <Popconfirm
            title="Delete Product?"
            description="Are you sure you want to delete this product?"
            onConfirm={() =>
              deleteProduct(product.id)
            }
            okText="Yes"
            cancelText="No"
          >

            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>

          </Popconfirm>

        </div>

      ),
    },
  ];


  // ===============================
  // UI
  // ===============================

  return (

    <div className="p-6">

      {/* ================= HEADER ================= */}

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-2xl font-bold">
          Product Dashboard
        </h1>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addProduct}
        >
          Add Product
        </Button>

      </div>


      {/* ================= TABLE ================= */}

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: 10,
        }}
      />


      {/* ================= DRAWER ================= */}

      <Drawer
        title={
          editingProduct
            ? "Edit Product"
            : "Add Product"
        }

        width={450}

        open={drawerOpen}

        onClose={() =>
          setDrawerOpen(false)
        }

        extra={

          <Button
            type="primary"
            onClick={() =>
              form.submit()
            }
          >
            Save
          </Button>

        }
      >

        <Form
          form={form}
          layout="vertical"
          onFinish={saveProduct}
        >

          {/* PRODUCT NAME */}

          <Form.Item
            name="name"
            label="Product Name"

            rules={[
              {
                required: true,
                message:
                  "Please enter product name",
              },
            ]}
          >

            <Input
              placeholder="Enter product name"
            />

          </Form.Item>


          {/* PRICE */}

          <Form.Item
            name="price"
            label="Price"

            rules={[
              {
                required: true,
                message:
                  "Please enter price",
              },
            ]}
          >

            <InputNumber
              className="w-full"
              min={0}
              placeholder="Enter price"
            />

          </Form.Item>


          {/* DESCRIPTION */}

          <Form.Item
            name="description"
            label="Description"
          >

            <Input.TextArea
              rows={4}
              placeholder="Enter description"
            />

          </Form.Item>

        </Form>

      </Drawer>

    </div>

  );
}

export default AdminProducts;