import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [visible, setVisible] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedname, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`category is created`);
        getAllcategory();
      } else {
        alert("alerttt");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllcategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/allcategory"
      );
      if (data.success) {
        console.log(data);

        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllcategory();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedname }
      );

      if (data.success) {
        toast.success(`category is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllcategory();
      } else alert("error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/deletecategory/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllcategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="p-3 w-50">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="col-md-9">
            <h1>Manage category</h1>
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <>
                      <tr>
                        <td key={c.id}>{c.name}</td>
                        <td>
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedname}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
