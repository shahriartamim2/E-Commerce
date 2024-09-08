import PageTitle from "@/components/PageTitle";
import { useProcessRegisterMutation } from "@/services/usersApi";
import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [processRegister, {isLoading, error}] = useProcessRegisterMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" || (key === "image" && formData[key] === null)) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    const formDataToSend = new FormData();
    // Append each form field to FormData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      await processRegister(formDataToSend).unwrap();
      navigate("/check-email");
    } catch (error) {
      console.error("Registration error:", error);
    }
  }
};

  return (
    <>
      <PageTitle title="Register" />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-8 m-8 bg-white shadow-2xl rounded-lg w-full max-w-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block py-3 text-gray-700">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block py-3 text-gray-700">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className="block py-3 text-gray-700">
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block py-3 text-gray-700">
                Address:
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block py-3 text-gray-700">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                className="input input-bordered w-full"
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="image" className="block py-3 text-gray-700">
                Image:
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleChange}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
            </div>
            <button type="submit" className="btn btn-active btn-neutral">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
